import Model from "../utils/Database/Model";

export type ICreditCard = {
    numbers: number
    holder: string
    expirationDate: Date
    cvv: string
}

class CreditCard extends Model<ICreditCard>{
    declare numbers: number
    declare holder: string
    declare expirationDate: Date
    declare cvv: string

    validate<T extends any>(field: string, value: T): T {
        return value;
    }
}

CreditCard.init({
    numbers: "NUMBER",
    holder: "STRING",
    expirationDate: "DATE",
    cvv: "STRING"
})
export default CreditCard;