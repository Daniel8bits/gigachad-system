import Model, { DataType } from "../utils/Database/Model";
import {IInvoice} from 'gigachad-shareds/models'

class Invoice extends Model<IInvoice>{
    @DataType("NUMBER")
    declare id: number
    @DataType("CPF")
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

    static async getLastID(cpfCustomer: string): Promise<number> {
        const result = await Invoice.findOne({
            where: {
                cpfCustomer
            },
            attributes: ["id"],
            order: [["id", "DESC"]]

        });
        if (result) return result.id;
        return 1;
    }
}

export default Invoice;