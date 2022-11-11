import express, { Router } from "express";
import MetaData from "./MetaData";
import middleware from '../middleware';
import { UserType } from "gigachad-shareds/models";
export type MethodRequest = "GET" | "DELETE" | "PUT" | "POST"

type RouteData = {
    method: MethodRequest,
    fn: Function
    target: any
    path: string
    middlewares: Function[]
}

type RouteCallback = (current: Partial<RouteData>) => void;

const RouteDecorator = (callback: RouteCallback) => (target: any, key: string, descriptor: PropertyDescriptor) => {
    const current = MetaData.route.get(target, key) ?? { target, fn: descriptor.value, middlewares: [] } as Partial<RouteData>;
    callback(current);
    MetaData.route.add(target, key, current);
}

export const Request = (method: MethodRequest) => RouteDecorator((current) => current.method = method);
export const Path = (path: string) => RouteDecorator((current) => current.path = path);
export const withAuth = RouteDecorator((current) => current.middlewares?.push(middleware.withAuth));
export const withUser = (...types: UserType[]) => RouteDecorator((current) => current.middlewares?.push(middleware.withUser(...types)));

class Route {

    private _route: Router;

    constructor() {
        this._route = express.Router();
        const routes = MetaData.route.get(this) as RouteData[];
        for (let key in routes) {
            const options = routes[key];
            const method = (options.method ?? "GET").toLocaleLowerCase();
            this._route[method].apply(this._route, [options.path, ...options.middlewares, options.fn]);
        }
    }

    get route(): Router {
        return this._route;
    }

}
export default Route;