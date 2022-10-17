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
        const user = await User.findEmailorCPF(login, undefined, {
            attributes: {
                exclude: ["password"]
            }
        })
        if (user && await user.checkPassword(password)) {
            res.success({ user: req.user, token: user.getToken() });

        }
        res.error(400, "Senha Incorreta");
    } catch (e: any) {
        console.log(e)
        res.error(400, e.message);
    }
}
export default Login;