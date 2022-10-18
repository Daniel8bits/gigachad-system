import Model, { DataType } from "../utils/Database/Model";

export type ICreditCard = {
    numbers: number
    holder: string
    expirationDate: Date
    cvv: string
}

class CreditCard extends Model<ICreditCard>{
    @DataType("NUMBER")
    declare numbers: number
    @DataType("STRING")
    declare holder: string
    @DataType("DATE")
    declare expirationDate: Date
    @DataType("STRING")
    declare cvv: string

    validate<T extends any>(field: string, value: T): T {
        return value;
    }
}

export default CreditCard;