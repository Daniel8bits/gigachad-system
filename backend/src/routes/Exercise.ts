import Express from 'express';
import Route, { Path, Request, withAuth, withUser } from "../utils/Route";
import ValidData, { Rules } from '../utils/ValidData';
import ExerciseModel from '../models/Exercise';
import { UserType } from 'gigachad-shareds/models'

class Exercise extends Route {

    static rules: Rules = {

    };

    @withUser(UserType.manager)
    @withAuth
    @Request("POST")
    @Path("/")
    async create(req: Express.Request, res: Express.Response) {
        try {
            const { name } = await ValidData(req.body, Exercise.rules);
            const exercise = await ExerciseModel.create({
                name
            })
            res.success(exercise);

        } catch (e: any) {
            res.error(500, e.message);
        }
    }

    @withUser(UserType.manager)
    @withAuth
    @Path("/")
    async findAll(req: Express.Request, res: Express.Response) {
        try {
            const exercise = await ExerciseModel.findAll({
                order: [["id", "ASC"]]
            })
            res.success(exercise);
        } catch (e: any) {
            res.error(500, e.message);
        }
    }

    @withUser(UserType.manager)
    @withAuth
    @Path("/:id")
    async findOne(req: Express.Request, res: Express.Response) {
        try {
            const exercise = await ExerciseModel.findOne({
                where:{
                    id: parseInt(req.params.id)
                },
                order: [["id", "ASC"]]
            })
            res.success(exercise);
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
            const qrCode = req.params.qrCode;
            const { name } = await ValidData(req.body, Exercise.rules);
            const exercise = await ExerciseModel.update({ name }, {
                where: {
                    id: parseInt(req.params.id)
                }
            })
            if (exercise) {
                res.success(exercise);
            } else {
                res.error(404, "Exercicio não encontrado");
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
            const result = await ExerciseModel.delete({
                where: {
                    id: parseInt(req.params.id)
                }
            })
            if (result) {
                res.success(result);
            } else {
                res.error(404, "Exercício não encontrado");
            }
        } catch (e: any) {
            res.error(500, e.message);
        }
    }

}

export default new Exercise