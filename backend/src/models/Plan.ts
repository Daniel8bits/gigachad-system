import Model, { DataType } from "../utils/Database/Model";
import {IPlan, FrequencyPlan} from 'gigachad-shareds/models'

class Plan extends Model<IPlan> {
    @DataType("NUMBER")
    declare id: number
    @DataType("STRING")
    declare name: string
    @DataType("STRING")
    declare description: string
    @DataType("FLOAT")
    declare value: number
    @DataType("ENUM", [
        FrequencyPlan.montly, 
        FrequencyPlan.quarterly, 
        FrequencyPlan.semmiannual, 
        FrequencyPlan.annual
    ])
    declare frequency: FrequencyPlan
    @DataType("BOOLEAN")
    declare available: boolean

    validate<T extends any>(field: string, value: T): T {
        return value;
    }
}
export default Plan;