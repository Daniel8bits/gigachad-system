import ExpressJS from "express"
import Route from "./Route";
import withAuth from "../middleware/withAuth";

class Express {

    private _app: ExpressJS.Express;

    constructor() {
        this._app = ExpressJS();
    }

    use(path: string, route: Route) {
        this._app.use(path, withAuth, route.route);
    }

    get app(): ExpressJS.Express {
        return this._app;
    }
}

export default Express;