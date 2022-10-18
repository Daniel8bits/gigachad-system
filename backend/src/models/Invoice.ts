import Model, { DataType } from "../utils/Database/Model";

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
    @DataType("NUMBER")
    declare id: number
    @DataType("STRING")
    declare cpfCustomer: string
    @DataType("NUMBER")
    declare idPlan: number
    @DataType("STRING")
    declare cardNumbers: string
    @DataType("NUMBER")
    declare value: number
    @DataType("STRING")
    declare status: string
    @DataType("STRING")
    declare payday: string
    @DataType("STRING")
    declare payMethod: string

    validate<T extends any>(field: string, value: T): T {
        return value;
    }
}

export default Invoice;