// TypeScript Version: 2.3

import { NextFunction } from 'express';
import { IncomingMessage } from 'http';

declare global {
    namespace Express {
        interface Request {
            //isAuthenticated(): this is AuthenticatedRequest;
            //isUnauthenticated(): this is UnauthenticatedRequest;
        }

        interface Response {
            error(status: number, message?: string): void
        }

        interface Handler {
            (req: Request, res: Response, next: NextFunction): void
        }
    }
}
