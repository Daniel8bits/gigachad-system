import { DataType } from "utils/Database/DataType";
import User, { IUser } from "./User";

export type ICustomer = IUser & {
    idCurrentPlan: number
}

class Customer extends User<ICustomer>{
    // Tem que ver isso depois
    @DataType("NUMBER")
    declare idCurrentPlan: number;

    validate<T extends any>(field: string, value: T): T {
        super.validate(field, value);
        return value;
    }
}

export default Customer;    