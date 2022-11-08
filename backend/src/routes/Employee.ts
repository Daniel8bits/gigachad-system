import Express from 'express';
import Route, { Path, Request, withAuth, withUser } from "../utils/Route";
import ValidData, { Rules } from '../utils/ValidData';
import User, { UserType } from '../models/User';
import EmployeeModel from '../models/Employee';
import Administrative from '../models/Administrative';
import Trainer from '../models/Trainer';


class Employee extends Route {

    static rules: Rules = {
    };

    @withUser(UserType.manager)
    @withAuth
    @Path("/")
    async findAll(req: Express.Request, res: Express.Response) {
        try {
            const employee = await EmployeeModel.findAll({
                include: [
                    {
                        model: User,
                        on: "employee.cpf=users.cpf",
                        attributes: {
                            exclude: ["password"]
                        }
                    },
                    {
                        model: Administrative,
                        on: "administrative.cpf=users.cpf"
                    },
                    {
                        model: Trainer,
                        on: "trainer.cpf=users.cpf"
                    }
                ]
            })
            res.success(employee);
        } catch (e: any) {
            console.log(e)
            res.error(500, e.message);
        }
    }

    @withUser(UserType.manager)
    @withAuth
    @Request("POST")
    @Path("/")
    async create(req: Express.Request, res: Express.Response) {
        try {
            const { cpf, name, email, phone, ctps, address, administrative } = await ValidData(req.body, Employee.rules);
            console.log(req.body)
            const user = await User.findOrCreate({
                cpf,
                name,
                email,
                phone,
                password: "2312312"
            }, { cpf })
            if (user) {
                //user.generatePassword("123123123");
                const employee = await EmployeeModel.findOrCreate({
                    cpf: user.cpf,
                    administrative,
                    ctps,
                    address,
                    admissionDate: new Date()
                }, { cpf })
                if (employee) {
                    if (administrative) {
                        const administrative = await Administrative.create({
                            cpf: user.cpf,
                            role: req.body.role
                        })
                        res.success({ ...user, employee, administrative });
                        return;
                    } else {
                        const trainer = await Trainer.create({
                            cpf: user.cpf,
                            cref: req.body.cref
                        });
                        res.success({ ...user, employee, trainer });
                        return;
                        //... Trainer
                    }
                }
            }
            res.error(500);
            // administrative            
        } catch (e: any) {
            console.log(e);
            res.error(500, e.message);
        }
    }

    @withUser(UserType.manager)
    @withAuth
    @Path("/:cpf")
    async findOne(req: Express.Request, res: Express.Response) {
        try {
            const cpf = req.params.cpf;
            const employee = await EmployeeModel.findOne({
                where: {
                    cpf
                },
                include: [
                    {
                        model: User,
                        on: "employee.cpf=users.cpf",
                        attributes: {
                            exclude: ["password"]
                        }
                    },
                    {
                        model: Administrative,
                        //optional: true,
                        on: "administrative.cpf=users.cpf"
                    },
                    {
                        model: Trainer,
                        on: "trainer.cpf=users.cpf",
                       // optional: true,
                    }
                ]
            })
            if (employee) {
                res.success(employee);
            } else {
                res.error(404, "Funcionario não encontrado");
            }
        } catch (e: any) {
            res.error(500, e.message);
        }
    }

    @withUser(UserType.manager)
    @withAuth
    @Request("PUT")
    @Path("/:cpf")
    async update(req: Express.Request, res: Express.Response) {
        try {
            const cpf = req.params.cpf;
            const { name, email, phone, address } = await ValidData(req.body, Employee.rules);
            const emp = await EmployeeModel.findOne({
                where: {
                    cpf: cpf
                }
            })
            if (emp) {
                const user = await User.update({ name, email, phone }, {
                    where: {
                        cpf: cpf
                    }
                })
                if (user) {
                    const employee = await EmployeeModel.update({ address }, {
                        where: {
                            cpf: cpf
                        }
                    })
                    res.success({ ...user, employee });
                } else {
                    res.error(404, "Usuario não encontrado");
                }
            } else {
                res.error(404, "Funcionario não encontrado");
            }

        } catch (e: any) {
            console.log(e)
            res.error(500, e.message);
        }
    }

    @withUser(UserType.manager)
    @withAuth
    @Request("DELETE")
    @Path("/:cpf")
    async delete(req: Express.Request, res: Express.Response) {
        try {
            const cpf = req.params.cpf;
            const result = await EmployeeModel.delete({
                where: {
                    cpf
                }
            })

            if (result) {
                res.success(result);
            } else {
                res.error(500);
            }
        } catch (e: any) {
            res.error(500, e.message);
        }

    }
}

export default new Employee;