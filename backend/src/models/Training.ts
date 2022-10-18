import Model from "../utils/Database/Model";

export type ITraining = {
    id: number
    cpfCustomer: string
    cpfTrainer: string
    name: string
    creationDate: Date
}

class Training extends Model<ITraining>{
    declare id: number
    declare cpfCustomer: string
    declare cpfTrainer: string
    declare name: string
    declare creationDate: Date

    validate<T extends any>(field: string, value: T): T {
        return value;
    }
}

Training.init({
    id: "NUMBER",
    cpfCustomer: "STRING",
    cpfTrainer: "STRING",
    name: "STRING",
    creationDate: "DATE"
})
export default Training;