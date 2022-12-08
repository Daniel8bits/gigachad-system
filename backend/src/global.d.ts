// TypeScript Version: 2.3

import exp, { NextFunction } from 'express';
import { IncomingMessage } from 'http';
import User from 'models/User';
import Database from './utils/Database/Database';

declare global {
    namespace Express {
        interface Request {
            user: User
            database?: Database
            //isAuthenticated(): this is AuthenticatedRequest;
            //isUnauthenticated(): this is UnauthenticatedRequest;
        }

        interface Response<ResBody = any> {
            error(status: number, message?: string): void
            success(object: ResBody, status: 200 | 201 = 200): void
        }
        /*
                interface Handler {
                    (req: Request, res: Response, next: NextFunction): void
                }*/
    }
}

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: 'development' | 'production' | 'test';
            PORT?: string;
        }
    }
}

declare global {

    namespace EndPoint {
        type TDefault = {
            params: any
            body: any
            query: any
        }
        type Request<T = TDefault> = exp.Request<T['params'], any, T['body'], T['query']>
    }
}

/*
interface Request<
        P = core.ParamsDictionary,
        ResBody = any,
        ReqBody = any,
        ReqQuery = core.Query,
        Locals extends Record<string, any> = Record<string, any>
*/