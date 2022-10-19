import ExpressJS from "express"
import Route from "./Route";

class Express {

    private _app: ExpressJS.Express;

    constructor() {
        this._app = ExpressJS();
    }

    use(path: string, route: Route) {
        this._app.use(path, route.route);
    }

    get app(): ExpressJS.Express {
        return this._app;
    }
}

export default Express;