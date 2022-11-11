import Model from "../utils/Database/Model";
import { DataType } from "../utils/Database/DataType";
import {ITrainer} from 'gigachad-shareds/models'

class Trainer extends Model<ITrainer>{
    @DataType("CPF")
    declare cpf: string;

    @DataType("STRING")
    declare cref: string;

    validate<T extends any>(field: string, value: T): T {
        return value;
    }
}

export default Trainer;    