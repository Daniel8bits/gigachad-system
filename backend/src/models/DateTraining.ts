import Model, { DataType } from "../utils/Database/Model";

export type IDateTraining = {
    idTraining: number
    cpfCustomer: number
    date: Date
}

class DateTraining extends Model<IDateTraining>{
    @DataType("NUMBER")
    declare idTraining: number
    @DataType("NUMBER")
    declare cpfCustomer: number
    @DataType("DATE")
    declare date: Date

    validate<T extends any>(field: string, value: T): T {
        return value;
    }
}

export default DateTraining;