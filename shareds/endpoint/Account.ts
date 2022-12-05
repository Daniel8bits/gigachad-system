export namespace ILogin {
    export type Request = {
        body: {
            login: string
            password: string
        }
    }
    export type Response = {
        user: any // tmp
        token: string
    }
}

export namespace IisAuth{
    export type Response = {
        user: any // tmp
    }
}

export {

}