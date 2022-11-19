import Express from "express";
import { UserType } from "gigachad-shareds/models";


const withUser = (...types: UserType[]): Express.Handler => (req, res, next) => {
    if (req.user) {
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