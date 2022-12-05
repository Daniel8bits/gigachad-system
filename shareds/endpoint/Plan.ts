
export type IPlan = {

}

export enum FrequencyPlan {
    montly = 'montly',
    semmiannual = 'semmiannual',
    quarterly = 'quarterly',
    annual = 'annual'
}

export namespace availables {
    export type Response = Array<IPlan>
}

export namespace findAll {
    export type Request = {
        query: {
            name: string
            description: string
            frequency: FrequencyPlan
            value: number
            available: string
        }
    }
    export type Response = Array<IPlan>
}

export namespace create {
    export type Request = {
        body: {
            name: string
            description: string
            frequency: FrequencyPlan
            value: number
            available: boolean
        }
    }
    export type Response = IPlan | false
}


export namespace findOne {
    export type Request = {
        params: {
            id: number
        }
    }
    export type Response = IPlan
}

export namespace update {
    export type Request = {
        params: {
            id: number
        }
        body: {
            name: string
            description: string
            frequency: FrequencyPlan
            value: number
            available: boolean
        }
    }
    export type Response = IPlan | false
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