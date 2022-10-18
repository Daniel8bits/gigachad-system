import Model from "../utils/Database/Model";

export type ITutorial = {
    idExercise: number
    video_url: string
    image: JSON
    explanation: string
}

class Tutorial extends Model<ITutorial>{
    declare idExercise: number
    declare video_url: string
    declare image: JSON
    declare explanation: string

    validate<T extends any>(field: string, value: T): T {
        return value;
    }
}

Tutorial.init({
    idExercise: "NUMBER",
    video_url: "STRING",
    image: "JSON",
    explanation: "STRING"
})
export default Tutorial;