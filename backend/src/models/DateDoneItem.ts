import Model, { DataType } from "../utils/Database/Model";
import {IDateDoneItem} from 'gigachad-shareds/models'

class DateDoneItem extends Model<IDateDoneItem>{
    @DataType("NUMBER")
    declare idTraining: number
    @DataType("NUMBER")
    declare cpfCustomer: number
    @DataType("DATE")
    declare date: Date
    @DataType("NUMBER")
    declare idExercise: number

    validate<T extends any>(field: string, value: T): T {
        return value;
    }
}

export default DateDoneItem;