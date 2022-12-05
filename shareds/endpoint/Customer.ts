
export type ICustomer = {

}

export namespace myPlans {
    export type Response = Array<ICustomer>
}
export namespace findAll {
    export type Response = Array<ICustomer>
}

export namespace create {
    export type Request = {
        body: {
            cpf: string
            name: string
            email: string
            phone: string
            password: string
            plan: number
        }
    }
    export type Response = ICustomer | false
}


export namespace findOne {
    export type Request = {
        params: {
            cpf: string
        }
    }
    export type Response = ICustomer
}

export namespace update {
    export type Request = {
        params: {
            cpf: string
        }
        body: {
            cpf: string
            name: string
            email: string
            phone: string
            password: string
            plan: number
        }
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