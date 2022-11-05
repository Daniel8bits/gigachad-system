import Express from 'express';
import Route, { Path, Request, withAuth, withUser } from "../utils/Route";
import ValidData, { Rules } from '../utils/ValidData';
import User, { UserType } from '../models/User';
import InvoiceModel from '../models/Invoice';

class Invoice extends Route {

    static rules: Rules = {

    };

    //@withUser(UserType.)
    @withAuth
    @Request("POST")
    @Path("/")
    async create(req: Express.Request, res: Express.Response) {
        try {
            const { idPlan, cardNumbers, value, status, payday, payMethod } = req.body

            const id = (await InvoiceModel.getLastID(req.user.cpf)) + 1;

            if (payMethod === 'creditCard') {
                const invoice = await InvoiceModel.create({
                    id,
                    cpfCustomer: req.user.cpf,
                    idPlan,
                    cardNumbers,
                    value,
                    status,
                    payday,
                    payMethod
                })
                res.success(invoice);
            } else {
                const invoice = await InvoiceModel.create({
                    id,
                    cpfCustomer: req.user.cpf,
                    idPlan,
                    cardNumbers: null,
                    value,
                    status,
                    payday,
                    payMethod
                })
                res.success(invoice);
            }

        } catch (e: any) {
            res.error(500, e.message);
        }

    }

    //@withUser(UserType.)
    @withAuth
    @Path("/")
    async findAll(req: Express.Request, res: Express.Response) {
        try {

            const invoices = await InvoiceModel.findAll({
                where: {
                    cpfCustomer: req.user.cpf
                }
            })

            res.success(invoices);
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
            const { cpfCustomer, idPlan, cardNumbers, value, status, payday, payMethod } = req.body
            const id = req.params.id

            await InvoiceModel.update({ value, status, payday, payMethod }, {
                where: {
                    cpfCustomer,
                    idPlan,
                    id: parseInt(id)
                }
            })
        } catch (e: any) {
            res.error(500, e.message);
        }
    }

}

export default new Invoice