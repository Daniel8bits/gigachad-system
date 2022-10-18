import { DataType } from "utils/Database/DataType";
import User, { IUser } from "./User";

export type IEmployee = IUser & {
    administrative: string
    ctps: string
    admissionDate: string
    address: string
}

class Employee extends User<IEmployee> {
    @DataType("STRING")
    declare administrative: string
    @DataType("STRING")
    declare ctps: string
    @DataType("STRING")
    declare admissionDate: string
    @DataType("STRING")
    declare address: string

    validate<T extends any>(field: string, value: T): T {
        super.validate(field, value);
        return value;
    }
}
export default Employee;    