import Express from 'express';
import Route, { Path, Request, withAuth, withUser } from "../utils/Route";
import ValidData, { Rules } from '../utils/ValidData';
import ExpenseModel from '../models/Expense';
import { UserType } from 'gigachad-shareds/models'
import type * as IExpense from 'gigachad-shareds/endpoint/Expense';

class Expense extends Route {

    static rules: Rules = {

    };

    @withUser(UserType.manager)
    @withAuth
    @Request("POST")
    @Path("/")
    async create(req: EndPoint.Request<IExpense.create.Request>, res: Express.Response<IExpense.create.Response>) {
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
    async findAll(req: EndPoint.Request<IExpense.findAll.Request>, res: Express.Response<IExpense.findAll.Response>) {
        const { totalValue, description, type } = await ValidData(req.query, Expense.rules);

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
    async findOne(req: EndPoint.Request<IExpense.update.Request>, res: Express.Response<IExpense.update.Response>) {
        try {
            const expenses = await ExpenseModel.findAll({
                where: {
                    id: req.params.id
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
    async update(req: EndPoint.Request<IExpense.update.Request>, res: Express.Response<IExpense.update.Response>) {
        try {
            const id = req.params.id;
            const { qrCodeEquipment, date, totalValue, description, type } = await ValidData(req.body, Expense.rules);
            console.log(date) 
            const expense = await ExpenseModel.update({ qrCodeEquipment, date: new Date(date), totalValue, description, type }, {
                where: {
                    id: id
                }
            })
            if (expense) {
                res.success(expense);
            } else {
                res.error(404, "Gasto n??o encontrado");
            }
        } catch (e: any) {
            res.error(500, e.message);
        }
    }


    @withUser(UserType.manager)
    @withAuth
    @Request("DELETE")
    @Path("/:id")
    async delete(req: EndPoint.Request<IExpense.del.Request>, res: Express.Response<IExpense.del.Response>) {
        try {
            const id = req.params.id;
            const result = await ExpenseModel.delete({
                where: {
                    id: id
                }
            })
            if (result) {
                res.success(result);
            } else {
                res.error(404, "Gasto n??o encontrado");
            }
        } catch (e: any) {
            res.error(500, e.message);
        }
    }


}

export default new Expense