import Express from 'express';
import { Route as Metadata } from '../utils/MetaData';
import Route, { Path, Request, withAuth, withUser } from "../utils/Route";
import PlanModel from '../models/Plan';
import ValidData, { Rules } from '../utils/ValidData';
import { UserType } from '../models/User';

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

    @withAuth
    @withUser(UserType.manager)
    @Path("/")
    async findAll(req: Express.Request, res: Express.Response) {
        try {
            const plan = await PlanModel.findAll({
                order: [["id", "ASC"]]
            })
            res.success(plan);
        } catch (e: any) {
            res.error(500, e.message);
        }
    }

    @withAuth
    @withUser(UserType.manager)
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

    @withAuth
    @withUser(UserType.manager)
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

    @withAuth
    @withUser(UserType.manager)
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

    @withAuth
    @withUser(UserType.manager)
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