import Express from 'express';
import Route, { Path, Request, withAuth, withUser } from "../utils/Route";
import ValidData, { Rules } from '../utils/ValidData';
import InvoiceModel from '../models/Invoice';
import PlanModel from '../models/Plan';
import CustomerModel from '../models/Customer';
import { UserType } from 'gigachad-shareds/models'
import * as IInvoice from 'gigachad-shareds/endpoint/Invoice'

class Invoice extends Route {

    static rules: Rules = {


    };

    //@withUser(UserType.)
    @withAuth
    @Request("POST")
    @Path("/")
    async create(req: EndPoint.Request<IInvoice.create.Request>, res: Express.Response<IInvoice.create.Response>) {
        try {
            const { idPlan, cardNumbers, value, status, payday, payMethod } = req.body

            const id = (await InvoiceModel.getLastID(req.user.cpf)) + 1;
            /*
            const plan = await PlanModel.findOne({
                where: {
                    id: req.user.Customer.idcurrentPlan
                }
            })
            if (plan) {
                if (payMethod === 'creditCard') {
                    const invoice = await InvoiceModel.create({
                        id,
                        cpfCustomer: req.user.cpf,
                        idPlan: plan.id,
                        cardNumbers,
                        value: plan.value,
                        status: 'paid',
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
                        status: 'open',
                        payday,
                        payMethod
                    })
                    res.success(invoice);
                }
            } else {
                res.error(404, "Plano não encontrado")
            }
            */
            
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
    async findAll(req: EndPoint.Request, res: Express.Response<IInvoice.findAll.Response>) {
        try {

            const invoices = await InvoiceModel.findAll({
                include: [
                    {
                        model: PlanModel,
                        on: "Plan.id=Invoice.idPlan"
                    }
                ],
                where: {
                    cpfCustomer: req.user.cpf,
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
    async update(req: EndPoint.Request<IInvoice.update.Request>, res: Express.Response<IInvoice.update.Response>) {
        try {
            const { cpfCustomer, idPlan, cardNumbers, value, status, payday, payMethod } = req.body
            const id = req.params.id

            await InvoiceModel.update({ value, status, payday, payMethod }, {
                where: {
                    cpfCustomer,
                    idPlan: Number(idPlan),
                    id: id
                }
            })
        } catch (e: any) {
            res.error(500, e.message);
        }
    }


}

export default new Invoice