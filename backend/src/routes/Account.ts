import Express from 'express';
import Route, { Path, Request, withAuth, withUser } from "../utils/Route";
import ValidData, { Rules } from '../utils/ValidData';
import User, { UserType, IUser } from '../models/User';

class Account extends Route {

    @Request("POST")
    @Path("/login")
    async login(req: Express.Request, res: Express.Response) {
        try {
            const { login, password } = req.body;
            console.log(req.body);
            await ValidData({ login, password }, {
                login: {
                    required: true
                },
                password: {
                    required: true
                }
            });
            const user = await User.findEmailorCPF(login)
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
}
export default new Account;