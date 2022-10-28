import Express from 'express';
import Route, { Path, Request, withAuth, withUser } from "../utils/Route";
import ValidData, { Rules } from '../utils/ValidData';
import User, { UserType } from '../models/User';
import CreditCardModel from '../models/CreditCard';
import CustomerCreditCardModel from '../models/CustomerCreditCard';
import CustomerModel from '../models/Customer';

class CreditCard extends Route {

    static rules: Rules = {

    };

    //@withUser(UserType.customer)
    @withAuth
    @Path("/")
    async findAll(req: Express.Request, res: Express.Response) {
        try {
            const cpfCustomer = req.body.cpfCustomer

            /*
                const creditCard = await CreditCardModel.findAll({
                    where: {
                        cpfCustomer
                    },
                    include: [
                        {
                            model: CustomerModel,
                            on: "customercreditcard.numberscreditcard=creditcard.numbers",
                        },
                    ]
                })
            */
            //res.success(creditCard);
        } catch (e: any) {
            res.error(500, e.message);
        }
    }

    @withUser(UserType.manager)
    @withAuth
    @Request("POST")
    @Path("/")
    async create(req: Express.Request, res: Express.Response) {
        try {
            const { numbers, holder, expirationDate, cvv, cpfCustomer } = await ValidData(req.body, CreditCard.rules);
            console.log(expirationDate.length)
            const customer = await CustomerModel.findOne({
                where: {
                    cpf: cpfCustomer
                }
            })

            if (!customer) {
                res.error(500, "cliente não encontrado")
            }

            const creditCard = await CreditCardModel.create({
                numbers,
                holder,
                expirationDate,
                cvv
            })

            if (creditCard) {
                const customerCreditCard = await CustomerCreditCardModel.create({
                    cpfCustomer,
                    numbersCreditCard: numbers
                })
                res.success({ ...creditCard, customerCreditCard });
            }

            res.success(creditCard);
        } catch (e: any) {
            res.error(500, e.message);
        }
    }


}

export default new CreditCard