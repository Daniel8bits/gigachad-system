import Model, { DataType } from "../utils/Database/Model";
import {ICreditCard} from 'gigachad-shareds/models'

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