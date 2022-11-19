import Model, { DataType } from "../utils/Database/Model";
import CreditCard from "./CreditCard";
import Customer from "./Customer";
import {ICustomerCreditCard} from 'gigachad-shareds/models'


class CustomerCreditCard extends Model<ICustomerCreditCard>{
    @DataType("CPF")
    declare cpfCustomer: string
    @DataType("STRING")
    declare numberscreditcard?: string
    @DataType("CLASS", { virtual: true })
    declare Customer: Customer
    @DataType("CLASS", { virtual: true })
    declare CreditCard: CreditCard;

    validate<T extends any>(field: string, value: T): T {
        return value;
    }
}

export default CustomerCreditCard;