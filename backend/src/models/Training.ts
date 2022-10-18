import Model, { DataType } from "../utils/Database/Model";

export type ITraining = {
    id: number
    cpfCustomer: string
    cpfTrainer: string
    name: string
    creationDate: Date
}

class Training extends Model<ITraining>{
    @DataType("NUMBER")
    declare id: number
    @DataType("STRING")
    declare cpfCustomer: string
    @DataType("STRING")
    declare cpfTrainer: string
    @DataType("STRING")
    declare name: string
    @DataType("DATE")
    declare creationDate: Date

    validate<T extends any>(field: string, value: T): T {
        return value;
    }
}
export default Training;