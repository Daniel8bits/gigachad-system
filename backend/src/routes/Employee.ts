import Express from 'express';
import Route, { Path, Request, withAuth, withUser } from "../utils/Route";
import ValidData, { Rules } from '../utils/ValidData';
import User from '../models/User';
import EmployeeModel from '../models/Employee';
import Administrative from '../models/Administrative';
import Trainer from '../models/Trainer';
import { UserType, IAdministrative } from 'gigachad-shareds/models'
import type * as IEmployee from 'gigachad-shareds/endpoint/Employee';

class Employee extends Route {

    static rules: Rules = {

    };

    @withUser(UserType.manager)
    @withAuth
    @Path("/")
    async findAll(req: EndPoint.Request, res: Express.Response<IEmployee.findAll.Response>) {
        const { cpfEmployee, name, address, ctps } = req.query;
        const query = req.query;
        const admissionDate = query.admissionDate as string
        try {
            const employee = await EmployeeModel.findAll({
                debug: true,
                include: [
                    {
                        model: User,
                        on: "employee.cpf=users.cpf",
                        attributes: {
                            exclude: ["password"]
                        },
                        where: {
                            and: {
                                name: {
                                    value: name ? `%${name}%` : undefined,
                                    op: "LIKE"
                                },
                                cpf: cpfEmployee
                            }
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
                ],
                where: {
                    address: {
                        value: address ? `%${address}%` : undefined,
                        op: "LIKE"
                    },
                    ctps,
                    //admissionDate
                }
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
    async create(req: EndPoint.Request<IEmployee.create.Request>, res: Express.Response<IEmployee.create.Response>) {
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
    async findOne(req: Express.Request, res: Express.Response<IEmployee.findOne.Response>) {
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
    async update(req: EndPoint.Request<IEmployee.update.Request>, res: Express.Response<IEmployee.update.Response>) {
        try {
            const cpf = req.params.cpf;
            const { name, email, phone, address, role/*Administrative */ } = await ValidData(req.body, Employee.rules);
            console.log(role)
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
                    if(role) {
                        await Administrative.update({role}, {
                            where: {
                                cpf
                            }
                        })
                    }
                    res.success({ ...user.toJSON(), employee });
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
    async delete(req: EndPoint.Request<IEmployee.del.Request>, res: Express.Response<IEmployee.del.Response>) {
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