import Express from "express";
import jwt, { JwtPayload } from 'jsonwebtoken';
import User from "../models/User";
const withAuth: Express.Handler = async (req, res, next) => {
    try {
        const token = (req.headers['x-access-token'] || req.query.token) as string;
        const payload = jwt.verify(token, process.env.SECRET_AUTH as string) as JwtPayload
        const user = await User.findOne({
            attributes: {
                exclude: ["password"]
            },
            where: {
                cpf: payload.cpf
            }
        })
        req.user = user;
        next()

    } catch (e: any) {
        res.error(401, e.message);
    }
}

export default withAuth;