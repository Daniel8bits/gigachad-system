import Express from "express";
import { UserType } from "models/User";


const withUser = (...types: UserType[]): Express.Handler => (req, res, next) => {
    console.log("withUser")
    if (req.user) {
        console.log("WithUser",types);
        if (types.includes(req.user.type)) {
            next()
            return;
        }
        res.error(403);
        return;
    }
    res.error(401);
}

export default withUser;