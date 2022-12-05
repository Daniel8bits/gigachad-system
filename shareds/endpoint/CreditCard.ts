
export type ICreditCard = {

}
export namespace findAll {
    export type Response = Array<ICreditCard>
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
    export type Response = ICreditCard
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