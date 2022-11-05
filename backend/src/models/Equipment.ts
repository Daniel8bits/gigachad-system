import Model, { DataType } from "../utils/Database/Model";

export type IEquipment = {
    qrCode: string
    name: string
    maintenanceDate: Date
}

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