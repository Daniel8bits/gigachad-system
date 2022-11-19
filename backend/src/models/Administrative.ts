import Model from "../utils/Database/Model";
import { DataType } from "../utils/Database/DataType";
import {IAdministrative} from 'gigachad-shareds/models'

class Administrative extends Model<IAdministrative>{
    // Tem que ver isso depois
    @DataType("CPF")
    declare cpf: string;

    @DataType("STRING")
    declare role: string;

    validate<T extends any>(field: string, value: T): T {
        return value;
    }
}

export default Administrative;    