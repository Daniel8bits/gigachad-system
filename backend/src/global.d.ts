declare namespace express {
    export interface Request {
        error?: string | undefined;
    }
}
declare global {
    interface ExpressApi {
        (...a: any): void
    }
}

/*import type express from 'express';

declare global {

    type ParamsDictionary = {
        [key: string]: string;
    }
    type Request<
        P = core.ParamsDictionary,
        ResBody = any,
        ReqBody = any,
        ReqQuery = core.Query,
        Locals extends Record<string, any> = Record<string, any>
    > = express.Request<P, ReqBody, ReqBody, ReqQuery, Locals> & {

    }
    
    type Response<ResBody = any, Locals extends Record<string, any> = Record<string, any>> = express.Response<ResBody, Locals> & {
        error: (status: number, message?: string) => void
    }
    type NextFunction = express.NextFunction & {

    }

    interface ExpressApi<Body = ParamsDictionary, Params = ParamsDictionary, Query = ParamsDictionary> {
        (req: Request<Params, any, Body, Query>, res: Response, next: NextFunction): void
    }
}
/*

    type FC<P = {}> = FunctionComponent<P>;

    interface FunctionComponent<P = {}> {
        (props: P, context?: any): ReactElement<any, any> | null;
        propTypes?: WeakValidationMap<P> | undefined;
        contextTypes?: ValidationMap<any> | undefined;
        defaultProps?: Partial<P> | undefined;
        displayName?: string | undefined;
    }

    */