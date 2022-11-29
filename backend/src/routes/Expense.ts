import Express from 'express';
import Route, { Path, Request, withAuth, withUser } from "../utils/Route";
import ValidData, { Rules } from '../utils/ValidData';
import ExpenseModel from '../models/Expense';
import { UserType } from 'gigachad-shareds/models'

class Expense extends Route {

    static rules: Rules = {

    };

    @withUser(UserType.manager)
    @withAuth
    @Request("POST")
    @Path("/")
    async create(req: Express.Request, res: Express.Response) {
        try {
            const { qrCodeEquipment, date, totalValue, description, type } = await ValidData(req.body, Expense.rules);
            const expanse = await ExpenseModel.create({
                qrCodeEquipment,
                date: new Date(date),
                totalValue,
                description,
                type
            })
            res.success(expanse);

        } catch (e: any) {
            res.error(500, e.message);
        }
    }

    @withUser(UserType.manager, UserType.financer)
    @withAuth
    @Path("/")
    async findAll(req: Express.Request, res: Express.Response) {
        const { date, totalValue, description, type } = await ValidData(req.query, Expense.rules);

        try {
            const expenses = await ExpenseModel.findAll({
                order: [["id", "ASC"]],
                where: {
                    and: {
                        description: {
                            value: description ? `%${description}%` : undefined,
                            op: "LIKE"
                        }, 
                        type,
                        totalValue,
                        //date 
                    }
                }
            })
            res.success(expenses);
        } catch (e: any) {
            res.error(500, e.message);
        }
    }

    @withUser(UserType.manager, UserType.financer)
    @withAuth
    @Path("/:id")
    async findOne(req: Express.Request, res: Express.Response) {
        try {
            const expenses = await ExpenseModel.findAll({
                where:{
                    id: parseInt(req.params.id)
                },
                order: [["id", "ASC"]]
            })
            res.success(expenses);
        } catch (e: any) {
            res.error(500, e.message);
        }
    }

    @withUser(UserType.manager, UserType.financer)
    @withAuth
    @Request("PUT")
    @Path("/:id")
    async update(req: Express.Request, res: Express.Response) {
        try {
            const id = req.params.id;
            const { qrCodeEquipment, date, totalValue, description, type } = await ValidData(req.body, Expense.rules);
            const expense = await ExpenseModel.update({ qrCodeEquipment, date, totalValue, description, type }, {
                where: {
                    id: parseInt(id)
                }
            })
            if (expense) {
                res.success(expense);
            } else {
                res.error(404, "Gasto não encontrado");
            }
        } catch (e: any) {
            res.error(500, e.message);
        }
    }

    @withUser(UserType.manager)
    @withAuth
    @Request("DELETE")
    @Path("/:id")
    async delete(req: Express.Request, res: Express.Response) {
        try {
            const id = req.params.id;
            const result = await ExpenseModel.delete({
                where: {
                    id: parseInt(id)
                }
            })
            if (result) {
                res.success(result);
            } else {
                res.error(404, "Gasto não encontrado");
            }
        } catch (e: any) {
            res.error(500, e.message);
        }
    }


}

export default new Expense