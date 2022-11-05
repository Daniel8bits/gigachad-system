import Model, { DataType } from "../utils/Database/Model";

export type ITutorial = {
    idExercise: number
    video_url: string
    image: JSON
    explanation: string
}

class Tutorial extends Model<ITutorial>{
    @DataType("NUMBER")
    declare idExercise: number
    @DataType("STRING")
    declare video_url: string
    @DataType("JSON")
    declare image: JSON
    @DataType("STRING")
    declare explanation: string

    validate<T extends any>(field: string, value: T): T {
        return value;
    }
}
export default Tutorial;