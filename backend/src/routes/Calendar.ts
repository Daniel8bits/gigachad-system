import Express from 'express';
import Route, { Path, Request, withUser, withAuth } from "../utils/Route";
import TrainingModel from '../models/Training';
import DateTrainingModel from '../models/DateTraining';
import TrainerModel from '../models/Trainer';
import UsersModel from '../models/User';
import { UserType } from 'gigachad-shareds/models'
import ExerciseItem from '../models/ExerciseItem';
import DateDoneItemModel from '../models/DateDoneItem'
import Exercise from '../models/Exercise';
const getDate = (day: number, month: number, year: number) => {

    if (month > 12) month = 1, year += 1;
    return `${year}-${month}-${day}`;
}

class Calendar extends Route {


    @withAuth
    @Path("/")
    async findAll(req: EndPoint.Request, res: Express.Response) {
        const { year, month, day, id } = req.query;
        let where = {};
        if (day) {
            where = {
                idtraining: id,
                date: getDate(Number(day) + 1, Number(month), Number(year))
            }
        } else {
            const date1 = getDate(1, Number(month), Number(year));
            const date2 = getDate(1, Number(month) + 1, Number(year));
            where = {
                date: {
                    op: ">=",
                    value: date1
                },
                and: {
                    date: {
                        op: "<",
                        value: date2
                    }
                }
            }
        }
        const trainings = (await DateTrainingModel.findAll({
            where: {
                //@ts-ignore
                cpfcustomer: req.user.cpf,
                ...where
            },
            //attributes: ["date","idtraining"],
            include: [
                {
                    model: TrainingModel,
                    on: "DateTraining.idTraining=Training.id",
                    attributes: ["name"]
                }
            ]
        })).map(async (item) => {
            if (!day) return item;
            //@ts-ignore
            const obj = item.toJSON() as any;
            obj.ExerciseItem = (await ExerciseItem.findAll({
                where: {
                    //@ts-ignore
                    cpfCustomer: item.cpfcustomer,
                    //@ts-ignore
                    idTraining: item.idtraining
                },
                attributes: ["idExercise", "series", "repetition", "weight"],
                include: [
                    {

                        model: DateDoneItemModel,
                        required: false,
                        on: `exerciseItem.idTraining=datedoneitem.idTraining AND exerciseItem.cpfCustomer=datedoneitem.cpfCustomer AND datedoneitem.idexercise=exerciseItem.idexercise`,
                        attributes: ["date"]
                    },

                    {
                        model: Exercise,
                        required: true,
                        on: 'exerciseItem.idExercise=exercise.id',
                        attributes: ["name"]
                    }
                ]
            })).map((exerciseitem) => {
                const ei = exerciseitem.toJSON() as any;
                if (ei.DateDoneItem && ei.DateDoneItem?.date?.getTime() != item?.date?.getTime()) {
                    ei.DateDoneItem = undefined;
                }
                return ei
            })
            return obj;

        });
        res.success(await Promise.all(trainings));
    }


    @withAuth
    @Request("POST")
    @Path("/")
    async create(req: Express.Request, res: Express.Response) {
        const { year, month, day, id } = req.body;
        try {
            const result = await DateTrainingModel.create({
                idtraining: id,
                date: new Date(getDate(Number(day) + 1, Number(month), Number(year))),
                cpfcustomer: req.user.cpf
            });
            res.success(result)
        } catch (e: any) {
            console.log(e);
            res.error(500, e.message)
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
                or: {
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
        console.log("findOne")
        const id = req.params.id;
        const training = await TrainingModel.findOne({
            where: {
                id: parseInt(id),
                cpfCustomer: req.user.cpf
            }/*
            include: [
                {
                    model: ExerciseItem,
                    on: "training.id=ExerciseItem.idTraining AND training.cpfCustomer=ExerciseItem.cpfCustomer"
                }
            ]*/
        })
        if (training) {
            //const tmp = training.toJSON() as any;
            training.exercises = await ExerciseItem.findAll({
                where: {
                    idTraining: id,
                    cpfCustomer: req.user.cpf
                }
            });
            res.success(training);
        } else {
            res.error(404, "Treinamento não encontrado");
        }

    }

    @withAuth
    @Request("PUT")
    @Path("/:id")
    async update(req: Express.Request, res: Express.Response) {
        const id = Number(req.params.id);
        const { year, month, day } = req.query;
        if (day) {
            const trainings = await DateTrainingModel.findOne({
                where: {
                    //@ts-ignore
                    cpfcustomer: req.user.cpf,
                    idTraining: id,
                    date: getDate(Number(day) + 1, Number(month), Number(year))
                },
                //attributes: ["date","idtraining"],
                include: [
                    {
                        model: TrainingModel,
                        on: "DateTraining.idTraining=Training.id",
                        attributes: ["name"]
                    }
                ]
            })
            if (trainings) {
                await DateDoneItemModel.delete({
                    where: {
                        cpfCustomer: req.user.cpf,
                        idTraining: id,
                    },
                    limit: 999
                })
                const { exercises } = req.body;

                const promises = Object.entries(exercises).filter(([, value]) => value === true).map(async ([idexercise]) => {
                    return await DateDoneItemModel.create({
                        cpfCustomer: req.user.cpf,
                        idTraining: id,
                        idexercise,
                        date: trainings.date
                    })
                });
                res.success(await Promise.all(promises));
            }

        } else {
            res.error(404, "Treinamento não encontrado");
        }
    }

    @withAuth
    @Request("DELETE")
    @Path("/:id")
    async delete(req: Express.Request, res: Express.Response) {
        const id = Number(req.params.id);
        const { year, month, day } = req.query;
        const date = getDate(Number(day) + 1, Number(month), Number(year));
        const DateTraining = await DateTrainingModel.findOne({
            where: {
                idTraining: id,
                date,
                //@ts-ignore
                cpfCustomer: req.user.cpf
            }
        })
        if (DateTraining) {
            await DateDoneItemModel.delete({
                //@ts-ignore
                idtraining: id,
                cpfCustomer: req.user.cpf,
                date: DateTraining.date
            })
            const result = await DateTrainingModel.delete({
                where: {
                    idTraining: id,
                    date,
                    //@ts-ignore
                    cpfCustomer: req.user.cpf
                }
            })
            res.success(result);

        } else {
            res.error(404, "Treinamento não encontrado");
        }

    }
}


export default new Calendar;