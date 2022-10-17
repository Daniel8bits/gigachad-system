import Express from 'express';
import ValidData from "../../utils/ValidData";

const Login: Express.Handler = async (req, res) => {
    try {
        const { login, password } = req.body;
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
        res.success(req.user);
    } catch (e: any) {
        res.error(400, e.message);
    }
}
export default Login;