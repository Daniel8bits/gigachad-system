import Model, { DataType } from "../utils/Database/Model";

export type IDateDoneItem = {
    idTraining: number
    cpfCustomer: number
    date: Date
    idExercise: number
}

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