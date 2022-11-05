import Model, { DataType } from "../utils/Database/Model";

export type ITraining = {
    id: number
    cpfCustomer: string
    cpfTrainer?: string | null
    name: string
    creationDate: Date
}

class Training extends Model<ITraining>{
    @DataType("NUMBER")
    declare id: number
    @DataType("CPF")
    declare cpfCustomer: string
    @DataType("CPF")
    declare cpfTrainer?: string | null
    @DataType("STRING")
    declare name: string
    @DataType("DATE")
    declare creationDate: Date

    validate<T extends any>(field: string, value: T): T {
        return value;
    }

    static async getLastID(cpfCustomer: string): Promise<number> {
        const result = await Training.findOne({
            where: {
                cpfCustomer
            },
            attributes: ["id"],
            order: [["id", "DESC"]]

        });
        if (result) return result.id;
        return 1;
    }
}
export default Training;