import Model from "../utils/Database/Model";
import { DataType } from "../utils/Database/DataType";

export type ICustomer = {
    cpf: string
    idCurrentPlan: number
}

class Customer extends Model<ICustomer>{
    @DataType("CPF")
    declare cpf: string;
    // Tem que ver isso depois
    @DataType("NUMBER")
    declare idCurrentPlan: number;

    validate<T extends any>(field: string, value: T): T {
        return value;
    }
}

export default Customer;    