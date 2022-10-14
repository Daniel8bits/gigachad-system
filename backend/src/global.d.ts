// TypeScript Version: 2.3

import { NextFunction } from 'express';
import { IncomingMessage } from 'http';
import User from 'models/User';

declare global {
    namespace Express {
        interface Request {
            user?: User
            //isAuthenticated(): this is AuthenticatedRequest;
            //isUnauthenticated(): this is UnauthenticatedRequest;
        }

        interface Response {
            error(status: number, message?: string): void
            success(object: any, status: 200 | 201 = 200): void
        }

        interface Handler {
            (req: Request, res: Response, next: NextFunction): void
        }
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
  