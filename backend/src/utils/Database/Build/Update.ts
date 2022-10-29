import Model, { Attributes, ModelStatic, OptionsWhere, Where } from "../Model";
import Select from './Select';

class Insert<M extends Model> extends Select<M>{

    protected _set: string[] = [];

    constructor(model: ModelStatic<M>, values: Attributes<M>, options: OptionsWhere<M>) {
        super(model, options);
        this.prepareSet(values);
    }

    prepareSet(values: Attributes<M>): void {
        for (let field in values) {
            const index = this._params.push(Model.encode(field, values[field], this.model));
            this._set.push(field + " = $" + index);
        }
    }

    get set() {
        return this._set.join(", ");
    }

    toSQL(): string {
        const sql: (string | number)[] = [];

        sql.push("UPDATE");
        sql.push(this.model.tableName)
        sql.push("SET");
        sql.push(this.set)
        sql.push(this.where)
        sql.push("RETURNING *");
        return sql.join(" ");
    }

    get params() {
        return this._params;
    }
}

export default Insert;