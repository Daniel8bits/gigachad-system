import Model from "../utils/Database/Model";

export type IDateDoneItem = {
    idTraining: number
    cpfCustomer: number
    date: Date
    idExercise: number
}

class DateDoneItem extends Model<IDateDoneItem>{
    declare idTraining: number
    declare cpfCustomer: number
    declare date: Date
    declare idExercise: number

    validate<T extends any>(field: string, value: T): T {
        return value;
    }
}

DateDoneItem.init({
    idTraining: "NUMBER",
    cpfCustomer: "NUMBER",
    date: "DATE",
    idExercise: "NUMBER"
})
export default DateDoneItem;