
import Model from "../utils/Database/Model";

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
}

class Plan extends Model<IPlan> {
    declare id: number
    declare name: string
    declare description: string
    declare value: number
    declare frequency: frequencyPlan

    validate<T extends any>(field: string, value: T): T {
        return value;
    }
}

Plan.init({
    id: "NUMBER",
    name: "STRING",
    description: "STRING",
    value: "NUMBER",
    frequency: "STRING"
})
export default Plan;