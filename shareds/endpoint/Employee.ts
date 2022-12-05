
export type IEmployee = {

}

export namespace findAll {
    export type Response = Array<IEmployee>
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
            ctps: string
            address: string
            administrative: string
            role?: 'financer' | 'attendant' | 'manager' // tmp
            cref?: string
        }
    }
    export type Response = IEmployee | false
}


export namespace findOne {
    export type Request = {
        params: {
            cpf: string
        }
    }
    export type Response = IEmployee
}

export namespace update {
    export type Request = {
        params: {
            cpf: string
        }
        body: {
            name: string
            email: string
            phone: string
            address: string
        }
    }
    export type Response = IEmployee | false
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