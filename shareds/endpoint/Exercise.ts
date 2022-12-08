
export type IExercise = {

}

export namespace findAll {
    export type Response = Array<IExercise>
}

export namespace create {
    export type Request = {
        body: {
            name: string
        }
    }
    export type Response = IExercise | false
}


export namespace findOne {
    export type Request = {
        params: {
            id: number
        }
    }
    export type Response = IExercise
}

export namespace update {
    export type Request = {
        params: {
            id: number
        }
        body: {
            name: string
        }
    }
    export type Response = IExercise | false
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