import Model, { DataType } from "../utils/Database/Model";
import {IExercise} from 'gigachad-shareds/models'

class Exercise extends Model<IExercise>{
    @DataType("NUMBER")
    declare id: number
    @DataType("STRING")
    declare name: string

    validate<T extends any>(field: string, value: T): T {
        return value;
    }
}

export default Exercise;