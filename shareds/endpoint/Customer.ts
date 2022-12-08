
export type ICustomer = {
    cpf: string
    name: string
    email: string
    phone: string
    password: string
    plan: number
}

export namespace myPlans {
    export type Response = Array<ICustomer>
}
export namespace findAll {
    export type Response = Array<ICustomer>
}

export namespace create {
    export type Request = {
        body: ICustomer
    }
    export type Response = ICustomer | false
}


export namespace findOne {
    export type Request = {
        params: {
            cpf: string
        }
    }
    export type Response = {
        cpf: string
        idcurrentplan: number
        Users:{
            cpf: string
            name: string
            email: string
            phone: string
        }
    }
}

export namespace update {
    export type Request = {
        params: {
            cpf: string
        }
        body: Omit<ICustomer, 'cpf'>
    }
    export type Response = ICustomer | false
}


export namespace del {
    export type Request = {
        params: {
            cpf: string
        }
    }
    export type Response = boolean
}


export {

}