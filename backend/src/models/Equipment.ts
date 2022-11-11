import Model, { DataType } from "../utils/Database/Model";
import {IEquipment} from 'gigachad-shareds/models'

class Equipment extends Model<IEquipment>{
    @DataType("STRING")
    declare qrCode: string
    @DataType("STRING")
    declare name: string
    @DataType("DATE")
    declare maintenanceDate: Date

    validate<T extends any>(field: string, value: T): T {
        return value;
    }
}
export default Equipment;