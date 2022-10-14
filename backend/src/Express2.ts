import exp from 'express';


class Express {
    private express: exp.Express;
    
    constructor() {
        this.express = exp();
    }
    
    /*
    use(...handlers: ExpressApi[]) {
        //@ts-ignore
        this.express.use(...handlers);
    }

    get(path: string, ...handlers: ExpressApi[]) {
        //@ts-ignore
        this.express.get(path, ...handlers);
    }

    post(path: string, ...handlers: ExpressApi[]) {
        //@ts-ignore
        this.express.post(path, ...handlers);
    }

    put(path: string, ...handlers: ExpressApi[]) {
        //@ts-ignore
        this.express.put(path, ...handlers);
    }

    delete(path: string, ...handlers: ExpressApi[]) {
        //@ts-ignore
        this.express.delete(path, ...handlers);
    }
*/
    listen(port) {
        this.express.listen(port, () => {
            console.log(`⚡️[server]: Server is running at https://localhost:${port}`)
        })
    }
}

export default Express