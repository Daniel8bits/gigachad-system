
export type ICalendar = {
    cpfcustomer: string
    date: string
    idtraining: number

    ExerciseItem: {
        series: number
        weight: number
        repetition: number
        idExercise: number,
        Exercise: {
            name: string
        },
        DateDoneItem: {
            date: string
        }
    }[]

    Training: {
        name: string
    }
}

export namespace myPlans {
    export type Response = Array<ICalendar>
}
export namespace findAll {
    export type Response = Array<ICalendar>
}

export namespace create {
    export type Request = {
        body: {
            id: number
            year: string
            month:string
            day: string
        }
    }
    export type Response = ICalendar | false
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
        Users: {
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
        body: Omit<ICalendar, 'cpf'>
    }
    export type Response = ICalendar | false
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