import Model, { ModelStatic, OptionsWhere, Where } from "../Model";
import Select from "./Select";

class Delete<M extends Model> extends Select<M>{

    toSQL(): string {
        const sql: (string | number)[] = [];

        sql.push("DELETE FROM");
        sql.push(this.model.tableName)
        sql.push(this.where)

        //sql.push(this.limit)
        return sql.join(" ");
    }

}

export default Delete;