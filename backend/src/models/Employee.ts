import Model from "../utils/Database/Model";
import { DataType, PrimarKey } from "../utils/Database/DataType";
import User from "./User";
import {IEmployee} from 'gigachad-shareds/models'

class Employee<A extends IEmployee = IEmployee> extends Model<A> {
    @PrimarKey
    @DataType("CPF")
    declare cpf: string;
    @DataType("STRING")
    declare administrative: string
    @DataType("STRING")
    declare ctps: string
    @DataType("STRING")
    declare admissionDate: Date
    @DataType("STRING")
    declare address: string
    @DataType("CLASS", { virtual: true })
    declare Users: User;

    validate<T extends any>(field: string, value: T): T {
        return value;
    }
}
/*
Employee.findOne({
    include: [
        {
            model: User,
            on: "employee.cpf=users.cpf"
        }
    ]
}).then(console.log).catch(console.error)*/
export default Employee;    