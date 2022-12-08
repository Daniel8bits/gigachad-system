import Model, { Attributes, ModelStatic, OptionsWhere, Where } from "../Model";
import Build from "./index";

class Insert<M extends Model> extends Build<M>{

    protected _names: string[] = [];
    protected _values: string[] = [];
    protected _params: string[] = [];

    constructor(model: ModelStatic<M>, values: Attributes<M>) {
        super(model, {});
        this.prepareValues(values)
    }

    prepareValues(values: Attributes<M>) {
        Object.entries(values).forEach(([field, value]) => {
            const index = this._params.push(Model.encode(field, value, this.model));
            this._names.push(field);
            this._values.push("$" + index);
        });
    }

    get names() {
        return "(" + this._names.join(", ") + ")";
    }

    get values() {
        return "(" + this._values.join(", ") + ")";
    }

    toSQL(): string {
        const sql: (string | number)[] = [];

        sql.push("INSERT INTO");
        sql.push(this.model.tableName)
        sql.push(this.names)
        sql.push("VALUES")
        sql.push(this.values)
        sql.push("RETURNING *")

        return sql.join(" ");
    }

    get params() {
        return this._params;
    }
}

export default Insert;
