
export type ICreditCard = {
    numbers: string
    holder: string
    expirationDate: string
    cvv: string
}

export type CreditCardResponse = {

    CreditCard: {
        holder: string
        expirationDate: string
        numbers: string
    }
    Customer: {
        cpf: string
        idcurrentplan: number
    }
    cpfcustomer: string

}
export namespace findAll {
    export type Response = Array<CreditCardResponse>
}

export namespace create {
    export type Request = {
        body: {
            numbers: string
            holder: string
            expirationDate: string
            cvv: string
        }
    }
    export type Response = ICreditCard | false
}


export namespace findOne {
    export type Request = {
        params: {
            numbersCreditCard: string
        }
    }
    export type Response = CreditCardResponse | false
}

export namespace update {
    export type Request = {
        params: {
            numbersCreditCard: string
        }
        body: {
            holder: string
            expirationDate: string
            cvv: string
        }
    }
    export type Response = ICreditCard | false
}


export namespace del {
    export type Request = {
        params: {
            numbersCreditCard: string
        }
    }
    export type Response = boolean
}


export {

}