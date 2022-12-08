
export type IInvoice = {
    idPlan: number
    cardNumbers: string
    value: number
    status: string
    payday: string
    payMethod: string
}

export namespace findAll {
    export type Response = Array<IInvoice>
}

export namespace create {
    export type Request = {
        body: {
            idPlan: number
            cardNumbers: string
            value: number
            status: string
            payday: string
            payMethod: string
        }
    }
    export type Response = IInvoice | false
}


export namespace findOne {
    export type Request = {
        params: {
            id: number
        }
    }
    export type Response = IInvoice
}

export namespace update {
    export type Request = {
        params: {
            id: number
        }
        body: {
            cpfCustomer: string
            idPlan: number
            cardNumbers: string
            value: number
            status: string
            payday: string
            payMethod: string
        }
    }
    export type Response = IInvoice | false
}


export {

}