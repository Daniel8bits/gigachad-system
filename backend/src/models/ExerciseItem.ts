import Model, { DataType } from "../utils/Database/Model";

export type IDateTraining = {
    idExercise: number
    idTraining: number
    cpfCustomer: string
    weight: number
    series: number
    repetition: number
}

class ExerciseItem extends Model<IDateTraining>{
    @DataType("NUMBER")
    declare idExercise: number
    @DataType("NUMBER")
    declare idTraining: number
    @DataType("STRING")
    declare cpfCustomer: string
    @DataType("NUMBER")
    declare weight: number
    @DataType("NUMBER")
    declare series: number
    @DataType("NUMBER")
    declare repetition: number

    validate<T extends any>(field: string, value: T): T {
        return value;
    }
}

export default ExerciseItem;