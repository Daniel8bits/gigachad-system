import Express from 'express';
import Route, { Path, Request, withAuth, withUser } from "../utils/Route";
import ValidData, { Rules } from '../utils/ValidData';
import User, { UserType } from '../models/User';
import CreditCardModel from '../models/CreditCard';
import CustomerCreditCardModel from '../models/CustomerCreditCard';
import CustomerModel from '../models/Customer';
import CustomerCreditCard from '../models/CustomerCreditCard';

class CreditCard extends Route {

    static rules: Rules = {

    };

    @withUser(UserType.customer)
    @withAuth
    @Path("/")
    async findAll(req: Express.Request, res: Express.Response) {
        try {
            const cpfCustomer = req.query.cpf as string;
            if (cpfCustomer) {

                const creditCard = await CreditCardModel.findAll({
                    where: {
                        holder: cpfCustomer
                    },
                    include: [
                        {
                            model: CustomerModel,
                            on: "customer.cpf=CustomerCreditCard.cpfCustomer",
                        },
                        {
                            model: CreditCardModel,
                            on: "CustomerCreditCard.numbersCreditCard=creditcard.numbers",
                            attributes: {
                                exclude: ["cvv", "holder"]
                            }
                        }
                    ]
                })

                res.success(creditCard);
                return;
            }
            res.error(400);
        } catch (e: any) {
            res.error(500, e.message);
        }
    }

    @withUser(UserType.customer)
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

    @withUser(UserType.customer)
    @withAuth
    @Path("/:numbersCreditCard")
    async findOne(req: Express.Request, res: Express.Response) {
        try {
            const numbers = req.params.numbersCreditCard;
            const creditCard = await CreditCardModel.findOne({
                where: {
                    numbers: numbers
                }
            })

            if (creditCard) {
                res.success(creditCard);
            } else {
                res.error(404, "Cartão de crédito não encontrado");
            }
        } catch (e: any) {
            res.error(500, e.message);
        }
    }

    @withUser(UserType.customer)
    @withAuth
    @Request("PUT")
    @Path("/:numbersCreditCard")
    async update(req: Express.Request, res: Express.Response) {
        try {
            const numPath = req.params.numbersCreditCard;
            const { holder, expirationDate, cvv, cpfCustomer } = await ValidData(req.body, CreditCard.rules);
            const creditCard = await CreditCardModel.findOne({
                where: {
                    numbers: numPath
                }
            })
            if (creditCard) {
                const customerCreditCard = await CustomerCreditCard.update({ cpfCustomer, numPath}, {
                    where: {
                        numbersCreditCard: numPath
                    }
                })
                if (customerCreditCard) {
                    const credit = await CreditCardModel.update({ numPath, holder, expirationDate, cvv }, {
                        where: {
                            numbers: numPath
                        }
                    })
                    res.success({ ...customerCreditCard, credit });
                } else {
                    res.error(404, "Cartão de crédito não encontrado");
                }
            } else {
                res.error(404, "Cartão de crédito não encontrado");
            }

        } catch (e: any) {
            console.log(e)
            res.error(500, e.message);
        }
    }

    @withUser(UserType.customer)
    @withAuth
    @Request("DELETE")
    @Path("/:numbersCreditCard")
    async delete(req: Express.Request, res: Express.Response) {
        try {
            const numPath = req.params.numbersCreditCard;
            const result1 = await CustomerCreditCard.delete({
                where: {
                    numbersCreditCard: numPath
                }
            })

            // caso não for "ON DELETE SET NULL ON UPDATE CASCADE" no banco força o delete na outra tabela aqui mesmo
            const result2 = await CreditCardModel.delete({
                where: {
                    numbers: numPath
                }
            })

            if (result2) {
                res.success(result2);
            } else {
                res.error(500);
            }
        } catch (e: any) {
            res.error(500, e.message);
        }

    }

}

export default new CreditCard