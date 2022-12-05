
export type EndPoint<Req, Res> = {
    request: Req
    response: Res
}

//Account
export type IAccount = EndPoint<{
    body: {
        login: string
        password: string
    }
}, {
    user: any // tmp
    token: string
}>;

// Attendant


export default function temp() {

}