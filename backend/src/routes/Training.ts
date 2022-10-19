import Express from 'express';
import Route, { Path, Request } from "../utils/Route";
import TrainingModel from '../models/Training';
import withAuth from "../middleware/withAuth";


class Training extends Route {

    @Path("/")
    async findAll(req: Express.Request, res: Express.Response) {
        const trainings = await TrainingModel.findAll({
            where: {
                cpfCustomer: req.user.cpf
            },
            order: [["id", "ASC"]]
        })
        res.success(trainings);
    }

    @Request("POST")
    @Path("/")
    async create(req: Express.Request, res: Express.Response) {
        const { name } = req.body;
        const lastID = await TrainingModel.getLastID(req.user.cpf);
        const result = await TrainingModel.create({
            id: lastID + 1,
            cpfCustomer: req.user.cpf,
            cpfTrainer: null,
            name: name,
            creationDate: new Date()
        })
        res.success(result);
    }

    @Path("/:id")
    async findOne(req: Express.Request, res: Express.Response) {
        const id = req.params.id;
        const training = await TrainingModel.findOne({
            where: {
                id: parseInt(id),
                cpfCustomer: req.user.cpf
            }
        })
        if (training) {
            res.success(training);
        } else {
            res.error(404, "Treinamento não encontrado");
        }

    }

    @Request("PUT")
    @Path("/:id")
    async update(req: Express.Request, res: Express.Response) {
        const id = req.params.id;
        const { name } = req.body;
        const training = await TrainingModel.update({ name }, {
            where: {
                id: parseInt(id),
                cpfCustomer: req.user.cpf
            }
        })
        if (training) {
            res.success(training);
        } else {
            res.error(404, "Treinamento não encontrado");
        }
    }

    @Request("DELETE")
    @Path("/:id")
    async delete(req: Express.Request, res: Express.Response) {
        const id = req.params.id;
        const result = await TrainingModel.delete({
            where: {
                id: parseInt(id),
                cpfCustomer: req.user.cpf
            }
        })
        if (result) {
            res.success(result);
        } else {
            res.error(404, "Treinamento não encontrado");
        }
    }
}


export default new Training;