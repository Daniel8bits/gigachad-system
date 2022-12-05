export = GigachadSystem

export as namespace GigachadSystem

declare namespace GigachadSystem {
    
export type EndPoint<Req, Res> = {
    request: Req
    response: Res
}
export type IAccount = EndPoint<{
    body: {
        login: string
        password: string
    }
}, {
    user: any // tmp
    token: string
}>;

}