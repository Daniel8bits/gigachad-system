import Express from "express";

const withAuth: Express.Handler = (req,  res, next) => {
    try {
        const token = req.headers['x-access-token'] || req.query.token
        next()
    } catch (e) {
        res.error(500);
    }
}

export default withAuth;