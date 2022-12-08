import Express from 'express';
import Route, { Path, Request, withAuth, withUser } from "../utils/Route";
import ValidData, { Rules } from '../utils/ValidData';
import User from '../models/User';
import CustomerModel from '../models/Customer';
import PlanModel from '../models/Plan';
import Invoice from '../models/Invoice';
import { UserType } from 'gigachad-shareds/models'
import type * as ICustomer from 'gigachad-shareds/endpoint/Customer';


class Customer extends Route {

    static rules: Rules = {
        plan: {
            callback: async (value) => {
                console.log(value);
                const result = await PlanModel.count({
                    where: {
                        id: value
                    }
                })
                console.log(result);
                return result != 0;
            },
            message: "Plano não encontrado"
        }
    };

    @Path("/plans")
    async MyPlans(req: EndPoint.Request, res: Express.Response<ICustomer.myPlans.Response>) {
        try {
            const plans = await Invoice.findAll({
                attributes: ["value", "payday"],
                where: {
                    cpfCustomer: req.user.cpf
                },
                include: [
                    {
                        model: PlanModel,
                        on: "plan.id=invoice.idPlan",
                        attributes: ["name"]
                    }
                ]
            })
            res.success(plans);
        } catch (e: any) {
            res.error(500, e.message);
        }
    }

    @Path("/plan")
    async MyPlan(req: EndPoint.Request, res: Express.Response<ICustomer.myPlans.Response>) {
        try {
            //n ta funcionando
            const customer = await CustomerModel.findOne({
                where: {
                    cpf: req.user.cpf
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

    //@withUser(UserType.manager, UserType.attendant)
    @Path("/:id/plans")
    async plans(req: EndPoint.Request, res: Express.Response) {
        try {
            const plans = await Invoice.findAll({
                debug: true,
                attributes: ["value", "payday"],
                where: {
                    cpfCustomer: req.params.id
                },
                include: [
                    {
                        model: PlanModel,
                        on: "plan.id=invoice.idPlan",
                        attributes: ["id", "name"]
                    }
                ],
                order: [["payday", "DESC"]],
                // groupby: ["idPlan","id"]
            })
            res.success(plans);
        } catch (e: any) {
            res.error(500, e.message);
        }
    }

    @withUser(UserType.manager, UserType.attendant)
    @withAuth
    @Request("POST")
    @Path("/")
    async create(req: EndPoint.Request<ICustomer.create.Request>, res: Express.Response<ICustomer.create.Response>) {
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
                const { plan } = await ValidData(req.body, Customer.rules);
                const customer = await CustomerModel.create({
                    cpf,
                    idCurrentPlan: plan
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
    async findAll(req: EndPoint.Request, res: Express.Response<ICustomer.findAll.Response>) {

        const { cpf, name } = req.query;
        try {
            const customer = await CustomerModel.findAll({
                include: [
                    {
                        model: User,
                        on: "customer.cpf=users.cpf",
                        attributes: {
                            exclude: ["password"]
                        },
                        where: {
                            and: {
                                name: {
                                    value: name ? `%${name}%` : undefined,
                                    op: "LIKE"
                                },
                                cpf
                            }
                        }
                    },
                    /* ...(req.user.type === UserType.attendant && {
                     {
                         model: Invoice,
                         on: "invoice.cpfCustomer=customer.cpf",
                         required:false
                     }
                   //  } || {})*/
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
    async findOne(req: EndPoint.Request<ICustomer.findOne.Request>, res: Express.Response<ICustomer.findOne.Response>) {
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

    @withUser(UserType.manager, UserType.customer, UserType.attendant)
    @withAuth
    @Request("PUT")
    @Path("/:cpf")
    async update(req: EndPoint.Request<ICustomer.update.Request>, res: Express.Response<ICustomer.update.Response>) {
        try {
            const { cpf } = req.params;
            const { name, email, phone, password, plan } = await ValidData(req.body, Customer.rules);
            console.log(plan)

            const user = await User.findOne({
                where: {
                    cpf
                }
            })
            if (user) {
                await User.update({ name, email, phone }, {
                    where: {
                        cpf
                    }
                })
                let customer;
                if (plan) {

                    customer = await CustomerModel.update({ idCurrentPlan: plan }, {
                        where: {
                            cpf
                        }
                    })
                } else {
                    customer = await CustomerModel.findOne({
                        where: {
                            cpf
                        }
                    })
                }

                res.success({ ...user.toJSON(), customer });
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
    async delete(req: EndPoint.Request<ICustomer.del.Request>, res: Express.Response<ICustomer.del.Response>) {
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