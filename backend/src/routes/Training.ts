import Express from 'express';
import Route, { Path, Request, withUser, withAuth } from "../utils/Route";
import TrainingModel from '../models/Training';
import TrainerModel from '../models/Trainer';
import UsersModel from '../models/User';
import { UserType } from 'gigachad-shareds/models'
import ExerciseItem from '../models/ExerciseItem';

class Training extends Route {

    @withAuth
    @Path("/")
    async findAll(req: Express.Request, res: Express.Response) {
        const trainings = (await TrainingModel.findAll({
            where: {
                cpfCustomer: req.user.cpf
            },
            include: [
                {
                    model: TrainerModel,
                    on: "training.cpfTrainer=trainer.cpf"
                },
                {
                    model: UsersModel,
                    on: "trainer.cpf=users.cpf",
                    attributes:["name"]
                }
            ],
            order: [["id", "ASC"]]
        })).map(async(item) => {
            if(item.Users){
                item.owner = item.Users.name;
            }
            delete item.cpfTrainer;
            delete item.Users;

            item.numExercise = await ExerciseItem.count({
                where:{
                    idTraining: item.id,
                    cpfCustomer: item.cpfCustomer
                }
            });

            return item;
        })
        res.success(await Promise.all(trainings));
    }


    @withAuth
    @Request("POST")
    @Path("/")
    async create(req: Express.Request, res: Express.Response) {
        if(req.user.type == UserType.trainer){
            const { name, cpfCustomer } = req.body;
            const lastID = await TrainingModel.getLastID(cpfCustomer);
            const result = await TrainingModel.create({
                id: lastID + 1,
                cpfCustomer: cpfCustomer,
                cpfTrainer: req.user.cpf,
                name: name,
                creationDate: new Date()
            })
            res.success(result);
        }else{
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
    }

    @withAuth
    @Path("/trainer/:id")
    async trainer(req: Express.Request, res: Express.Response) {
        const id = req.params.id;
        const { cpfCustomer } = req.body;
        const training = await TrainingModel.findOne({
            where: {
                id: parseInt(id),
                or:{
                    cpfCustomer,
                    cpfTrainer: req.user.cpf
                }
            }
        })
        if (training) {
            res.success(training);
        } else {
            res.error(404, "Treinamento não encontrado");
        }

    }

    @withAuth
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
    
    @withAuth
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

    @withAuth
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