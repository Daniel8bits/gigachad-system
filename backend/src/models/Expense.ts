import Model, { DataType } from "../utils/Database/Model";
import {IExpense, TypeExpense} from 'gigachad-shareds/models'

class Expense extends Model<IExpense>{
    @DataType("NUMBER")
    declare id: number
    @DataType("STRING")
    declare qrCodeEquipment: string
    @DataType("DATE")
    declare date: Date
    @DataType("NUMBER")
    declare totalValue: number
    @DataType("STRING")
    declare description: string
    @DataType("ENUM", [
        TypeExpense.billPayment, 
        TypeExpense.employeePayment,
        TypeExpense.equipamentBuy,
        TypeExpense.equipamentMaintenance,
        TypeExpense.others
    ])
    declare type: TypeExpense

    validate<T extends any>(field: string, value: T): T {
        return value;
    }
}

export default Expense;