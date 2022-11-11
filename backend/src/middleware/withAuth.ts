import Express from "express";
import jwt, { JwtPayload } from 'jsonwebtoken';
import User from "../models/User";
import Administrative from "../models/Administrative";
import Customer from "../models/Customer";
import Trainer from "../models/Trainer";
import { UserType } from 'gigachad-shareds/models'

const withAuth: Express.Handler = async (req, res, next) => {
    console.log("withAuth")
    try {
        const token = (req.headers['authorization']?.replace("Bearer ", "") || req.query.token) as string;
        if (token) {
            const payload = jwt.decode(token/*, process.env.SECRET_AUTH as string*/) as JwtPayload
            const user = await User.findOne({
                attributes: {
                    exclude: ["password"]
                },
                where: {
                    cpf: payload.cpf
                },
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
                user.type = UserType.user;
                if (user.Trainer) {
                    user.type = UserType.trainer;
                } else
                    if (user.Administrative) {
                        switch (user.Administrative.role) {
                            case "financer":
                                user.type = UserType.financer;
                                break;
                            case "attendant":
                                user.type = UserType.attendant;
                                break;
                            case "manager":
                                user.type = UserType.manager;
                                break;
                        }
                    } else
                        if (user.Customer) {
                            user.type = UserType.customer;
                        }
                req.user = user;
                next()
                return;
            }
        }
        res.error(401);
    } catch (e: any) {
        //console.log(e)
        res.error(401, e.message);
    }
}

export default withAuth;