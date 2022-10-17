import express from "express";
import withAuth from "../../middleware/withAuth";

import Auth from "./Auth";
import Login from "./Login";

const account = express.Router();
account.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});
account.get("/auth", withAuth, Auth)
account.post("/login", withAuth, Login)

export default account;