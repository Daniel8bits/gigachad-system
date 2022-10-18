import Model, { DataType } from "../utils/Database/Model";

export type IExercise = {
    id: number
    name: string
}

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