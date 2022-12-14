import Express from 'express';
import Route, { Path, Request, withAuth, withUser } from "../utils/Route";
import ValidData, { Rules } from '../utils/ValidData';
import User from '../models/User';
import EquipmentModel from '../models/Equipment';
import { UserType } from 'gigachad-shareds/models'
import type * as IEquipment from 'gigachad-shareds/endpoint/Equipment'

class Equipment extends Route {

    static rules: Rules = {

    };

    @withUser(UserType.manager)
    @withAuth
    @Request("POST")
    @Path("/")
    async create(req: EndPoint.Request<IEquipment.create.Request>, res: Express.Response<IEquipment.create.Response>) {
        try {
            const { qrCode, name, maintenanceDate } = await ValidData(req.body, Equipment.rules);
            console.log("qrCode",qrCode);
            const equipment = await EquipmentModel.create({
                qrcode: qrCode,
                name,
                maintenanceDate
            })
            res.success(equipment);

        } catch (e: any) {
            res.error(500, e.message);
        }
    }

    @withUser(UserType.manager)
    @withAuth
    @Path("/")
    async findAll(req: EndPoint.Request<IEquipment.findAll.Request>, res: Express.Response<IEquipment.findAll.Response>) {
        try {
            const { qrcode, name, maintenancedate } = await ValidData(req.query, Equipment.rules);

            const equipment = await EquipmentModel.findAll({
                order: [["qrCode", "ASC"]],
                where: {
                    and: {
                        name: {
                            value: name ? `%${name}%` : undefined,
                            op: "LIKE"
                        },
                        qrCode: qrcode,
                        //maintenanceDate: maintenancedate
                    }
                }
            })
            res.success(equipment);
        } catch (e: any) {
            res.error(500, e.message);
        }
    }

    @withUser(UserType.manager)
    @withAuth
    @Path("/:qrCode")
    async findOne(req: EndPoint.Request<IEquipment.findOne.Request>, res: Express.Response<IEquipment.findOne.Response>) {
        try {
            const expenses = await EquipmentModel.findOne({
                where: {
                    qrCode: req.params.qrCode
                },
                order: [["qrCode", "ASC"]]
            })
            res.success(expenses);
        } catch (e: any) {
            res.error(500, e.message);
        }
    }

    @withUser(UserType.manager)
    @withAuth
    @Request("PUT")
    @Path("/:qrCode")
    async update(req: EndPoint.Request<IEquipment.update.Request>, res: Express.Response<IEquipment.update.Response>) {
        try {
            const qrCode = req.params.qrCode;
            const { name, maintenanceDate } = await ValidData(req.body, Equipment.rules);
            const expense = await EquipmentModel.update({ name, maintenanceDate }, {
                where: {
                    qrCode
                }
            })
            if (expense) {
                res.success(expense);
            } else {
                res.error(404, "Equipamento n??o encontrado");
            }
        } catch (e: any) {
            res.error(500, e.message);
        }
    }

    @withUser(UserType.manager)
    @withAuth
    @Request("DELETE")
    @Path("/:qrCode")
    async delete(req: EndPoint.Request<IEquipment.del.Request>, res: Express.Response<IEquipment.del.Response>) {
        try {
            const qrCode = req.params.qrCode;
            const result = await EquipmentModel.delete({
                where: {
                    qrCode: qrCode
                }
            })
            if (result) {
                res.success(result);
            } else {
                res.error(404, "Equipamento n??o encontrado");
            }
        } catch (e: any) {
            res.error(500, e.message);
        }
    }

}

export default new Equipment