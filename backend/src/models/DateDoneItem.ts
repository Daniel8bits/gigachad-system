import Model, { DataType } from "../utils/Database/Model";
import {IDateDoneItem} from 'gigachad-shareds/models'

class DateDoneItem extends Model<IDateDoneItem>{
    @DataType("NUMBER")
    declare idtraining: number
    @DataType("CPF")
    declare cpfCustomer: string
    @DataType("DATE")
    declare date: Date
    @DataType("NUMBER")
    declare idexercise: number

    validate<T extends any>(field: string, value: T): T {
        return value;
    }
}

export default DateDoneItem;