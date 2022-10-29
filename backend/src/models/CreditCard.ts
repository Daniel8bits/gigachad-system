import Model, { DataType } from "../utils/Database/Model";

export type ICreditCard = {
    numbers: string
    holder: string
    expirationDate: string
    cvv: string
}

class CreditCard extends Model<ICreditCard>{
    @DataType("STRING")
    declare numbers: string
    @DataType("STRING")
    declare holder: string
    @DataType("STRING")
    declare expirationDate: string
    @DataType("STRING")
    declare cvv: string

    validate<T extends any>(field: string, value: T): T {
        return value;
    }
}

export default CreditCard;