import Model, { ModelStatic, OptionsWhere } from "./Model";

export type BuildType = "SELECT" | "UPDATE" | "INSERT" | "DELETE";
class Build<M extends Model> {

    private model: ModelStatic<M>;
    private options: OptionsWhere<M>;
    private _where: string = "";
    private _params: string[] = [];

    constructor(model: ModelStatic<M>, options: OptionsWhere<M>) {
        this.model = model;
        this.options = options;
        this.prepareWhere();
    }

    prepareWhere() {
        const { where } = this.options;
        for (let field in where) {
            const value = where[field];
            if (value) {
                const index = this._params.push(value);
                this._where = field + " = $" + index;
            }
        }
    }
    /*
        set limit(limit: number, offset: number | undefined = undefined) {
            this.options.limit = limit;
            this.options.offset = offset;
        }*/

    get attributes(): string {
        if (this.options.attributes) {
            return this.options.attributes.join(",");
        }
        return "*";
    }

    get from(): string {
        return "FROM public." + this.model.tableName;
    }

    get where(): string {
        if (this.options.where) {
            return "WHERE " + this._where;
        }
        return "";
    }

    get orberby(): string {
        const { order } = this.options;
        if (order) {
            const sql: string[] = [];
            for (let [field, orderby] of order) {
                sql.push((field as string) + " " + orderby);
            }
            return "ORDER BY " + sql.join(", ");
        }
        return "";
    }

    get groupby(): string {
        if (this.options.groupby) {
            return "GROUP BY "+this.options.groupby;
        }
        return "";
    }

    get limit(): string {
        const { limit, offset } = this.options;
        if (limit) return "LIMIT " + limit + (offset ? ", " + offset : "");
        return "";
    }

    toSQL(type: BuildType): string {
        const sql: (string | number)[] = [];

        sql.push(type);
        if (type == "INSERT") {

        } else {
            if (type == "SELECT") sql.push(this.attributes)
            if (type == "SELECT" || type == "DELETE") sql.push(this.from)
            else sql.push(this.model.tableName)
            sql.push(this.where)

            sql.push(this.orberby)

            sql.push(this.groupby)

            sql.push(this.limit)
        }
        return sql.join(" ");
        /*
        SELECT .. FROM .. WHERE .. 
        UPDATE ... SET ... WHERE ...
        DELETE FROM ... WHERE ...
        INSERT ... (...) VALUES (...)
        */
    }

    get params() {
        return this._params;
    }
}

export default Build;