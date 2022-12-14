import Express from 'express';
import Route, { Path, Request, withAuth, withUser } from "../utils/Route";
import ValidData, { Rules } from '../utils/ValidData';
import ExerciseModel from '../models/Exercise';
import { UserType } from 'gigachad-shareds/models'
import type * as IExercise from 'gigachad-shareds/endpoint/Exercise';

class Exercise extends Route {

    static rules: Rules = {

    };

    @withUser(UserType.manager)
    @withAuth
    @Request("POST")
    @Path("/")
    async create(req: EndPoint.Request<IExercise.create.Request>, res: Express.Response<IExercise.create.Response>) {
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

    //@withUser(UserType.manager)
    @withAuth
    @Path("/")
    async findAll(req: EndPoint.Request, res: Express.Response<IExercise.findAll.Response>) {
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
    async findOne(req: EndPoint.Request<IExercise.findOne.Request>, res: Express.Response<IExercise.findOne.Response>) {
        try {
            const exercise = await ExerciseModel.findOne({
                where: {
                    id: req.params.id
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
    async update(req: EndPoint.Request<IExercise.update.Request>, res: Express.Response<IExercise.update.Response>) {
        try {
            const { name } = await ValidData(req.body, Exercise.rules);
            const exercise = await ExerciseModel.update({ name }, {
                where: {
                    id: req.params.id
                }
            })
            if (exercise) {
                res.success(exercise);
            } else {
                res.error(404, "Exercicio n??o encontrado");
            }
        } catch (e: any) {
            res.error(500, e.message);
        }
    }

    @withUser(UserType.manager)
    @withAuth
    @Request("DELETE")
    @Path("/:id")
    async delete(req: EndPoint.Request<IExercise.del.Request>, res: Express.Response<IExercise.del.Response>) {
        try {
            const result = await ExerciseModel.delete({
                where: {
                    id: req.params.id
                }
            })
            if (result) {
                res.success(result);
            } else {
                res.error(404, "Exerc??cio n??o encontrado");
            }
        } catch (e: any) {
            res.error(500, e.message);
        }
    }

}

export default new Exercise