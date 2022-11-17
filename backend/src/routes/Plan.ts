import Express from 'express';
import Route, { Path, Request, withAuth, withUser } from "../utils/Route";
import PlanModel from '../models/Plan';
import ValidData, { Rules } from '../utils/ValidData';
import { UserType } from 'gigachad-shareds/models'

class Plan extends Route {

    static rules: Rules = {
        name: {
            required: true
        },
        description: {
            required: true
        }
    };

    @Path("/availables")
    async plans(req: Express.Request, res: Express.Response) {
        try {

            const plans = await PlanModel.findAll({
                where: {
                    available: true
                },
                order: [["id", "ASC"]]
            })
            res.success(plans);
        } catch (e: any) {
            res.error(500, e.message);
        }
    }

    @withUser(UserType.manager)
    @withAuth
    @Path("/")
    async findAll(req: Express.Request, res: Express.Response) {
        try {
            const query = req.query;
            const name = query.name as string;
            const description = query.description as string;
            const value = Number(query.value as string);
            const available = (query.available as string) === 'true';
            const plan = await PlanModel.findAll({
                debug: true,
                order: [["id", "ASC"]],
                where: {
                    and: {
                        name: {
                            value: name ? `%${name}%` : undefined,
                            op: "LIKE"
                        },
                        description: {
                            value: description ? `%${description}%` : undefined,
                            op: "LIKE" // value LIKE $1
                        },
                        value,//value = $1
                        available: available ? true : undefined
                    }
                }
            })
            res.success(plan);
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
            const { name, description, value, frequency, available } = await ValidData(req.body, Plan.rules);
            const plan = await PlanModel.create({
                name,
                description,
                value,
                frequency,
                available
            })
            res.success(plan);
        } catch (e: any) {
            res.error(500, e.message);
        }
    }


    @withUser(UserType.manager)
    @withAuth
    @Path("/:id")
    async findOne(req: Express.Request, res: Express.Response) {
        try {
            const id = req.params.id;
            const plan = await PlanModel.findOne({
                where: {
                    id: parseInt(id)
                }
            })
            if (plan) {
                res.success(plan);
            } else {
                res.error(404, "Plano não encontrado");
            }
        } catch (e: any) {
            res.error(500, e.message);
        }
    }

    @withUser(UserType.manager)
    @withAuth
    @Request("PUT")
    @Path("/:id")
    async update(req: Express.Request, res: Express.Response) {
        try {
            const id = req.params.id;
            const { name, description, value, frequency, available } = await ValidData(req.body, Plan.rules);
            const plan = await PlanModel.update({ name, description, value, frequency, available }, {
                where: {
                    id: parseInt(id)
                }
            })
            if (plan) {
                res.success(plan);
            } else {
                res.error(404, "Plano não encontrado");
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
            const result = await PlanModel.delete({
                where: {
                    id: parseInt(id)
                }
            })
            if (result) {
                res.success(result);
            } else {
                res.error(404, "Plano não encontrado");
            }
        } catch (e: any) {
            res.error(500, e.message);
        }
    }
}


export default new Plan;