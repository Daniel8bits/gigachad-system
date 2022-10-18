import Model from "../utils/Database/Model";

export type IInvoice = {
    id: number
    cpfCustomer: string
    idPlan: number
    cardNumbers: string
    value: number
    status: string
    payday: string
    payMethod: string
}
class Invoice extends Model<IInvoice>{
    declare id: number
    declare cpfCustomer: string
    declare idPlan: number
    declare cardNumbers: string
    declare value: number
    declare status: string
    declare payday: string
    declare payMethod: string

    validate<T extends any>(field: string, value: T): T {
        return value;
    }
}

Invoice.init({
    id: "NUMBER",
    cpfCustomer: "STRING",
    idPlan: "NUMBER",
    cardNumbers: "STRING",
    value: "NUMBER",
    status: "STRING",
    payday: "STRING",
    payMethod: "STRING"
})
export default Invoice;