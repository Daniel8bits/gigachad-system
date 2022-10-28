import Model, { DataType } from "../utils/Database/Model";

export type ICustomerCreditCard = {
    cpfCustomer: string
    numbersCreditCard: string
}

class CustomerCreditCard extends Model<ICustomerCreditCard>{
    @DataType("STRING")
    declare cpfCustomer: string
    @DataType("STRING")
    declare numbersCreditCard: string

    validate<T extends any>(field: string, value: T): T {
        return value;
    }
}

export default CustomerCreditCard;