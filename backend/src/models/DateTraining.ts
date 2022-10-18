import Model from "../utils/Database/Model";

export type IDateTraining = {
    idTraining: number
    cpfCustomer: number
    date: Date
}

class DateTraining extends Model<IDateTraining>{
    declare idTraining: number
    declare cpfCustomer: number
    declare date: Date

    validate<T extends any>(field: string, value: T): T {
        return value;
    }
}

DateTraining.init({
    idTraining: "NUMBER",
    cpfCustomer: "NUMBER",
    date: "DATE"
})
export default DateTraining;