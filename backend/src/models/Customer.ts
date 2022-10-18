import User, { IUser } from "./User";

export type ICustomer = IUser & {
    idCurrentPlan: number
}

class Customer extends User<ICustomer>{

    declare idCurrentPlan: number;

    validate<T extends any>(field: string, value: T): T {
        super.validate(field,value);
        return value;
    }
}

Customer.init({
    cpf: "STRING",
    name: "STRING",
    email: "STRING",
    password: "STRING",
    phone: "STRING",
    idCurrentPlan: "NUMBER"
})
export default Customer;    