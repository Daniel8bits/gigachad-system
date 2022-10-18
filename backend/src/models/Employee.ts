import User, { IUser } from "./User";

export type IEmployee = IUser & {
    administrative: string
    ctps: string
    admissionDate: string
    address: string
}

class Employee extends User<IEmployee> {

    declare administrative: string
    declare ctps: string
    declare admissionDate: string
    declare address: string

    validate<T extends any>(field: string, value: T): T {
        super.validate(field,value);
        return value;
    }
}

Employee.init({
    cpf: "STRING",
    name: "STRING",
    email: "STRING",
    password: "STRING",
    phone: "STRING",
    administrative: "STRING",
    ctps: "STRING",
    address: "STRING",
    admissionDate: "STRING"
})
export default Employee;    