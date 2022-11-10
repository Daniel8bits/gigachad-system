
import Model, { DataType } from "../utils/Database/Model";

export enum frequencyPlan {
    montly = 'montly',
    semmiannual = 'semmiannual',
    quarterly = 'quarterly',
    annual = 'annual'
}

export type IPlan = {
    id: number
    name: string
    description: string
    value: number
    frequency: frequencyPlan
    available: boolean
}

class Plan extends Model<IPlan> {
    @DataType("NUMBER")
    declare id: number
    @DataType("STRING")
    declare name: string
    @DataType("STRING")
    declare description: string
    @DataType("FLOAT")
    declare value: number
    @DataType("ENUM", ["montly", "semmiannual", "quarterly", "annual"])
    declare frequency: frequencyPlan
    @DataType("BOOLEAN")
    declare available: boolean

    validate<T extends any>(field: string, value: T): T {
        return value;
    }
}
export default Plan;