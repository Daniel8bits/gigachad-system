import Express from 'express';
import Route, { Path, Request, withAuth, withUser } from "../utils/Route";
import ValidData, { Rules } from '../utils/ValidData';
import User, { UserType } from '../models/User';
import CustomerModel from '../models/Customer';
class Customer extends Route {

    static rules: Rules = {

    };

    //@withUser(UserType.attendant)
    @withAuth
    @Request("POST")
    @Path("/")
    async create(req: Express.Request, res: Express.Response) {
        try {
            const { cpf, name, email, phone, password } = await ValidData(req.body, Customer.rules);
            const user = await User.findOrCreate({
                cpf,
                name,
                email,
                phone,
                password: "2312312"
            }, { cpf })

            if (user) {
                const { idCurrentPlan } = await ValidData(req.body, Customer.rules);
                const customer = await CustomerModel.create({
                    cpf,
                    idCurrentPlan
                })
                res.success({ user, customer });
            }
            res.error(500);
        } catch (e: any) {
            res.error(500, e.message);
        }
    }

    @withUser(UserType.manager, UserType.financer, UserType.trainer, UserType.attendant)
    @withAuth
    @Path("/")
    async findAll(req: Express.Request, res: Express.Response) {
        try {
            const customer = await CustomerModel.findAll({
                include: [
                    {
                        model: User,
                        on: "customer.cpf=users.cpf",
                        attributes: {
                            exclude: ["password"]
                        }
                    }
                ]
            })
            res.success(customer);
        } catch (e: any) {
            res.error(500, e.message);
        }
    }


    @withUser(UserType.manager, UserType.financer, UserType.trainer, UserType.attendant)
    @withAuth
    @Path("/:cpf")
    async findOne(req: Express.Request, res: Express.Response) {
        try {
            const cpf = req.params.cpf;
            const customer = await CustomerModel.findOne({
                where: {
                    cpf
                },
                include: [
                    {
                        model: User,
                        on: "customer.cpf=users.cpf",
                        attributes: {
                            exclude: ["password"]
                        }
                    }
                ]
            })
            res.success(customer);
        } catch (e: any) {
            res.error(500, e.message);
        }
    }

    @withUser(UserType.manager, UserType.customer)
    @withAuth
    @Request("PUT")
    @Path("/:cpf")
    async update(req: Express.Request, res: Express.Response) {
        try {
            const { cpf, name, email, phone, password, idCurrentPlan } = await ValidData(req.body, Customer.rules);

            const user = await User.findOne({
                where: {
                    cpf
                }
            })
            if (user) {
                const user = await User.update({ name, email, phone }, {
                    where: {
                        cpf
                    }
                })
                const customer = await CustomerModel.update({ idCurrentPlan }, {
                    where: {
                        cpf
                    }
                })

                res.success({ ...user, customer });
            } else {
                res.error(404, "Cliente não encontrado");
            }
        } catch (e: any) {
            res.error(500, e.message);
        }
    }


    @withUser(UserType.manager)
    @withAuth
    @Request("DELETE")
    @Path("/:cpf")
    async delete(req: Express.Request, res: Express.Response) {
        try {
            const cpf = req.params.cpf
            const result = await CustomerModel.delete({
                where: {
                    cpf
                }
            })
            if (result) {
                res.success(result);
            } else {
                res.error(404, "Customer não encontrado");
            }
        } catch (e: any) {
            res.error(500, e.message);
        }
    }
}

export default new Customer