type A = {

}

type B<T> = {
    data: T
}

type C = {
    id: number
    name: string
}
export type Reducer = { [key: string]: (state: A, payload: B<any>) => void }

const recurds: Reducer = {
    create: (state: A, payload: B<C>) => {
        payload.data.id
    }
}