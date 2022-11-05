import Model, { DataType } from "../utils/Database/Model";

export enum TypeExpense {
    equipamentBuy = 'equipamentBuy',
    equipamentMaintenance = 'equipamentMaintenance',
    billPayment = 'billPayment',
    employeePayment = 'employeePayment',
    others = 'others'
}

export type IExpense = {
    id: number
    qrCodeEquipmen: string
    date: Date
    totalValue: number
    description: string
    typeExpense: TypeExpense
}

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
    @DataType("ENUM", ["equipamentBuy", "equipamentMaintenance", "billPayment", "employeePayment", "others"])
    declare type: TypeExpense

    validate<T extends any>(field: string, value: T): T {
        return value;
    }
}

export default Expense;