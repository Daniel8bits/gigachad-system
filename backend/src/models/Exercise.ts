import Model from "../utils/Database/Model";

export type IExercise = {
    id: number
    name: string
}

class Exercise extends Model<IExercise>{
    declare id: number
    declare name: string

    validate<T extends any>(field: string, value: T): T {
        return value;
    }
}

Exercise.init({
    id: "NUMBER",
    name: "STRING"
})
export default Exercise;