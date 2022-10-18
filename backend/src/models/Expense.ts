import Model from "../utils/Database/Model";

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
    declare id: number
    declare qrCodeEquipmen: string
    declare date: Date
    declare totalValue: number
    declare description: string
    declare typeExpense: TypeExpense
    
    validate<T extends any>(field: string, value: T): T {
        return value;
    }
}

Expense.init({
    id: "NUMBER",
    qrCodeEquipmen: "STRING",
    date: "DATE",
    totalValue: "NUMBER",
    description: "STRING",
    typeExpense: "STRING"
})
export default Expense;