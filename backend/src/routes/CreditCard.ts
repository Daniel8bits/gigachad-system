import Express from 'express';
import Route, { Path, Request, withAuth, withUser } from "../utils/Route";
import ValidData, { Rules } from '../utils/ValidData';
import CreditCardModel from '../models/CreditCard';
import CustomerCreditCardModel from '../models/CustomerCreditCard';
import CustomerModel from '../models/Customer';
import CustomerCreditCard from '../models/CustomerCreditCard';
import { UserType } from 'gigachad-shareds/models'

class CreditCard extends Route {

    static rules: Rules = {

    };

    // @withUser(UserType.manager)
    @withUser(UserType.customer)
    @withAuth
    @Path("/")
    async findAll(req: Express.Request, res: Express.Response) {
        try {
            /*
            const customer = await CustomerModel.findOne({
                where: {
                    cpf: req.user.cpf
                }
            })

            if (!customer) {
                res.error(500, "cliente não encontrado")
            }

            if (cpfCustomer) {
                const numbersCards = await CustomerCreditCard.findAll({
                    where: {
                        cpfCustomer
                    }
                })
                if (numbersCards) {
                    var cards: any[] = [];

                    for (var i = 0; i < numbersCards.length; i++) {
                        const card = await CreditCardModel.findOne({
                            where: {
                                numbers: numbersCards[i].numberscreditcard
                            }
                        })
                        cards.push(card)
                    }
                    res.success(cards);
                }
            }*/
            const creditCard = (await CustomerCreditCardModel.findAll({
                where: {
                    cpfCustomer: req.user.cpf
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
            })).map((item) => {
                item.numberscreditcard = "";
                item.CreditCard.numbers = "**** **** **** " + item.CreditCard.numbers.substring(13, 17);
                return item;
            })

            res.success(creditCard);
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
            const { numbers, holder, expirationDate, cvv } = await ValidData(req.body, CreditCard.rules);

            const creditCard = await CreditCardModel.create({
                numbers,
                holder,
                expirationDate,
                cvv
            })

            if (creditCard) {
                const customerCreditCard = await CustomerCreditCardModel.create({
                    cpfCustomer: req.user.cpf,
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
                },
                attributes: {
                    exclude: ["cvv", "holder"]
                },
                include: [
                    {
                        model: CustomerCreditCard,
                        on: "CustomerCreditCard.numbersCreditCard=creditcard.numbers",
                        required: true,
                        where: {
                            cpfCustomer: req.user.cpf
                        }
                    }
                ]
            })

            if (creditCard) {
                creditCard.numbers = "**** **** **** " + creditCard.numbers.substring(13, 17);
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

            const { holder, expirationDate, cvv } = await ValidData(req.body, CreditCard.rules);
            const creditCard = await CreditCardModel.findOne({
                where: {
                    numbers: numPath
                },
                include: [
                    {
                        model: CustomerCreditCard,
                        on: "CustomerCreditCard.numbersCreditCard=creditcard.numbers",
                        required: true,
                        where: {
                            cpfCustomer: req.user.cpf
                        }
                    }
                ]
            })
            if (creditCard) {
                // const customerCreditCard = await CustomerCreditCard.update({ cpfCustomer, numbersCreditCard: numPath }, {
                //     where: {
                //         numbersCreditCard: numPath
                //     }
                // })

                // if (customerCreditCard) {
                const credit = await CreditCardModel.update({ holder, expirationDate, cvv }, {
                    where: {
                        numbers: creditCard.numbers
                    }
                })
                res.success(credit);
                // } else {
                //     res.error(404, "Cartão de crédito não encontrado");
                // }
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
            const result = await CustomerCreditCard.delete({
                where: {
                    numbersCreditCard: numPath,
                    cpfCustomer: req.user.cpf
                }
            })

            res.success(result);
        } catch (e: any) {
            res.error(500, e.message);
        }

    }

}

export default new CreditCard