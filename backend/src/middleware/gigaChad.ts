import Express from 'express';


const gigaChad: Express.Handler = (req, res, next) => {
    res.error = (status: number, message?: string) => {
        res.status(status).json({ data: {}, message: message || handleStatus[status] })
    };
    res.success = (object: any, status = 200) => {
        res.status(status).json({ data: object })
    };
    next();
}

export const handleStatus = {
    500: "Error Interno"
}


export default gigaChad;