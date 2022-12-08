import Model, { DataType } from "../utils/Database/Model";
import {IExerciseItem} from 'gigachad-shareds/models'
import DateDoneItem  from './DateDoneItem';

class ExerciseItem extends Model<IExerciseItem>{
    @DataType("NUMBER")
    declare idExercise: number
    @DataType("NUMBER")
    declare idTraining: number
    @DataType("CPF")
    declare cpfCustomer: string
    @DataType("NUMBER")
    declare weight: number
    @DataType("NUMBER")
    declare series: number
    @DataType("NUMBER")
    declare repetition: number
    @DataType("CLASS",{virtual: true})
    declare DateDoneItem: DateDoneItem;

    validate<T extends any>(field: string, value: T): T {
        return value;
    }
}

export default ExerciseItem;