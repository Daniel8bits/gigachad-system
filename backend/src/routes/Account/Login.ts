import Express from 'express';
import User from '../../models/User';
import ValidData from "../../utils/ValidData";

const Login: Express.Handler = async (req, res) => {
    try {
        const { login, password } = req.body;
        console.log(req.body);
        await ValidData({ login, password }, {
            login: {
                callback: (value) => {
                    console.log(value)
                    return true;
                },
                message: ""
            },
            password: {
                required: true
            }
        });
        const user = await User.findEmailorCPF(login)
        if (user) {

            //console.log(await user.generatePassword("login123"));
            if (user && await user.checkPassword(password)) {
                const userReq = user.toJSON();
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
export default Login;