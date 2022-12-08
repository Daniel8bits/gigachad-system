import Model, { DataType } from "../utils/Database/Model";
import {IDateTraining} from 'gigachad-shareds/models'

class DateTraining extends Model<IDateTraining>{
    @DataType("NUMBER")
    declare idtraining: number
    @DataType("CPF")
    declare cpfCustomer: number
    @DataType("DATE")
    declare date: Date

    validate<T extends any>(field: string, value: T): T {
        return value;
    }
}

export default DateTraining;