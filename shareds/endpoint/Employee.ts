
export type IEmployee = {
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

export type EmployeeResponse = {
    Trainer:{
        cpf: string
        cref: string
    }
    Administrative:{
        cpf: string
        role: string
    }
    Users:{
        cpf: string
        email: string
        name: string
        phone: string
    }
    address: string
    administrative: string
    admissiondate: string
    cpf: string
    ctps: string

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
            role: 'financer' | 'attendant' | 'manager'
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