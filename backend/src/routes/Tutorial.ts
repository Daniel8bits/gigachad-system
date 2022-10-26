import Express from 'express';
import Route, { Path, Request, withAuth, withUser } from "../utils/Route";
import ValidData, { Rules } from '../utils/ValidData';
import User, { UserType } from '../models/User';
import TutorialModel from '../models/Tutorial';

class Tutorial extends Route {

    static rules: Rules = {

    };

    @withUser(UserType.manager)
    @withAuth
    @Request("POST")
    @Path("/")
    async create(req: Express.Request, res: Express.Response) {
        try {
            const { idExercise, video_url, image, explanation } = await ValidData(req.body, Tutorial.rules);
            console.log(image);
            const tutorial = await TutorialModel.create({
                idExercise,
                video_url,
                image,
                explanation
            })
            res.success(tutorial);

        } catch (e: any) {
            res.error(500, e.message);
        }
    }

    @withUser(UserType.manager)
    @withAuth
    @Path("/")
    async findAll(req: Express.Request, res: Express.Response) {
        try {
            const tutorial = await TutorialModel.findAll({
                order: [["idExercise", "ASC"]]
            })
            res.success(tutorial);
        } catch (e: any) {
            res.error(500, e.message);
        }
    }

    @withUser(UserType.manager)
    @withAuth
    @Path("/:id")
    async findOne(req: Express.Request, res: Express.Response) {
        try {
            const tutorial = await TutorialModel.findOne({
                where: {
                    idExercise: parseInt(req.params.id)
                },
                order: [["idExercise", "ASC"]]
            })
            res.success(tutorial);
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
            const { video_url, image, explanation } = await ValidData(req.body, Tutorial.rules);
            const exercise = await TutorialModel.update({ video_url, image, explanation }, {
                where: {
                    idExercise: parseInt(req.params.id)
                }
            })
            if (exercise) {
                res.success(exercise);
            } else {
                res.error(404, "Tutorial não encontrado");
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
            const result = await TutorialModel.delete({
                where: {
                    idExercise: parseInt(req.params.id)
                }
            })
            if (result) {
                res.success(result);
            } else {
                res.error(404, "Tutorial não encontrado");
            }
        } catch (e: any) {
            res.error(500, e.message);
        }
    }

}

export default new Tutorial