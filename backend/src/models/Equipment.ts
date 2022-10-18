import Model from "../utils/Database/Model";

export type IEquipment = {
    qrCode: string
    name: string
    maintenanceDate: Date
}

class Equipment extends Model<IEquipment>{

    declare qrCode: string
    declare name: string
    declare maintenanceDate: Date

    validate<T extends any>(field: string, value: T): T {
        return value;
    }
}

Equipment.init({
    qrCode: "STRING",
    name: "STRING",
    maintenanceDate: "DATE"
})

// (async () => {

//     const equipament = await Equipment.findOne({
//         where: {
//             qrCode: "aa"
//         },
//         attributes: {
//             exclude: ["qrCode"]
//         }
//     })
//     equipament.name;
// })()

export default Equipment;