import Express from 'express';
import Route, { Path, Request, withAuth, withUser } from "../utils/Route";
import ValidData, { Rules } from '../utils/ValidData';
import User from '../models/User';
import Administrative from "../models/Administrative";
import Customer from "../models/Customer";
import Trainer from "../models/Trainer";
import type { ILogin, IisAuth } from 'gigachad-shareds/endpoint/Account';

class Account extends Route {

    @Request("POST")
    @Path("/login")
    async login(req: Express.Request<any, any, ILogin.Request['body']>, res: Express.Response<ILogin.Response>) {
        try {
            const { login, password } = req.body;
            await ValidData({ login, password }, {
                login: {
                    required: true
                },
                password: {
                    required: true
                }
            });
            const user = await User.findEmailorCPF(login, undefined, {
                include: [
                    {
                        model: Trainer,
                        on: "trainer.cpf=users.cpf"
                    },
                    {
                        model: Administrative,
                        on: "administrative.cpf=users.cpf"
                    },
                    {
                        model: Customer,
                        on: "customer.cpf=users.cpf"
                    }
                ]
            })
            if (user) {

                //console.log(await user.generatePassword("login123"));
                if (user && await user.checkPassword(password)) {
                    const userReq = user.toJSON() as any;
                    delete userReq.password;
                    res.success({ user: userReq, token: user.getToken() });
                    return;
                }
                res.error(400, "Senha Incorreta");
            } else {
                res.error(404, "Usuário não encontrado");
            }

        } catch (e: any) {
            console.log(e)
            res.error(400, e.message);
        }
    }

    @Path("/isAuth")
    @withAuth
    async isAuth(req: Express.Request, res: Express.Response<IisAuth.Response>) {
        console.log(req.user);
        res.success({ user: req.user });
    }
}
export default new Account;