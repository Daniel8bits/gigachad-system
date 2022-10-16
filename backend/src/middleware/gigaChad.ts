import Express from 'express';


const gigaChad: Express.Handler = (req, res, next) => {
    res.error = (status: number, message?: string) => {
        res.status(status).json({ data: {}, message: message || handleStatus[status],status })
    };
    res.success = (object: any, status = 200) => {
        res.status(status).json({ data: object })
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