import Express from 'express';
import Database from '../utils/Database/Database';


const gigaChad: Express.Handler = (req, res, next) => {
    req.database = new Database();
    res.error = (status: number, message?: string) => {
        res.status(status).json({ data: {}, message: message || handleStatus[status], status })
        req.database?.end();
    };
    res.success = (object: any = {}, status = 200) => {
        res.status(status).json({ data: object, status })
        req.database?.end();
    };
    next();
}

export const handleStatus = {
    200: "Ok",
    201: "Criado",
    400: "Requisição Ruim",
    401: "Não Autorizado",
    403: "Acesso Negado",
    404: "Não Encontrado",
    500: "Error Interno"
}


export default gigaChad;