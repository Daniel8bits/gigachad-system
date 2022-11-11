import Model, { DataType } from "../utils/Database/Model";
import {IDateTraining} from 'gigachad-shareds/models'


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