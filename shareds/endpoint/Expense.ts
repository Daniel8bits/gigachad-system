
export type IExpense = {

}
export enum TypeExpense {
    equipamentBuy = 'equipamentBuy',
    equipamentMaintenance = 'equipamentMaintenance',
    billPayment = 'billPayment',
    employeePayment = 'employeePayment',
    others = 'others'
}

export namespace findAll {
    export type Request = {
        query: {
            date: string
            totalValue: number
            description: string
            type: TypeExpense
        }
    }
    export type Response = Array<IExpense>
}

export namespace create {
    export type Request = {
        body: {
            qrCodeEquipment: string
            date: string
            totalValue: number
            description: string
            type: TypeExpense
        }
    }
    export type Response = IExpense | false
}


export namespace findOne {
    export type Request = {
        params: {
            id: number
        }
    }
    export type Response = IExpense
}

export namespace update {
    export type Request = {
        params: {
            id: number
        }
        body: {
            qrCodeEquipment: string
            date: string
            totalValue: number
            description: string
            type: TypeExpense
        }
    }
    export type Response = IExpense | false
}


export namespace del {
    export type Request = {
        params: {
            id: number
        }
    }
    export type Response = boolean
}


export {

}