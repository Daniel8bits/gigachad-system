import Model from "../utils/Database/Model";

export type IDateTraining = {
    idExercise: number
    idTraining: number
    cpfCustomer: string
    weight: number
    series: number
    repetition: number
}

class ExerciseItem extends Model<IDateTraining>{
    declare idExercise: number
    declare idTraining: number
    declare cpfCustomer: string
    declare weight: number
    declare series: number
    declare repetition: number

    validate<T extends any>(field: string, value: T): T {
        return value;
    }
}

ExerciseItem.init({
    idExercise: "NUMBER",
    idTraining: "NUMBER",
    cpfCustomer: "STRING",
    weight: "NUMBER",
    series: "NUMBER",
    repetition: "NUMBER",
})
export default ExerciseItem;