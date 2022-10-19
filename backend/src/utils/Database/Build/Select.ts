import {database as MetaData} from "../../MetaData";
import Model, { ModelStatic, OptionsWhere, Where } from "../Model";
import Build from "./index";

class Select<M extends Model> extends Build<M>{

    protected _where: string = "";
    protected _params: string[] = [];

    constructor(model: ModelStatic<M>, options: OptionsWhere<M>) {
        super(model, options);
        this.prepareWhere();
    }

    prepareWhere() {
        this._where = this.buildWhere(this.options.where);
    }

    buildWhere(wheres: Where<any>, or: boolean = false): string {
        const where: string[] = [];
        const attributes = MetaData.get(this.model, "attributes");
        for (let field in wheres) {
            const value = wheres[field];
            if (field == "or" || field == "and") {
                where.push("(" + this.buildWhere(value, field === "or") + ")");
            } else if (value) {
                const index = this._params.push(this.model.encode(field, value, attributes[field]));
                where.push(field + " = $" + index);
            }
        }
        return where.join(or ? " OR " : " AND ");
    }
    get attributes(): string {
        const { attributes } = this.options;
        if (attributes) {
            if (attributes.include) return attributes.include.join(",");
            if (attributes.exclude) return this.model.attributes.filter((field) => !attributes.exclude.includes(field)).join(",");
            return attributes.join(",");
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
            return "GROUP BY " + this.options.groupby;
        }
        return "";
    }

    get limit(): string {
        const { limit, offset } = this.options;
        if (limit) return "LIMIT " + limit + (offset ? ", " + offset : "");
        return "";
    }

    toSQL(): string {
        const sql: (string | number)[] = [];

        sql.push("SELECT");
        sql.push(this.attributes)
        sql.push(this.from)
        sql.push(this.where)

        sql.push(this.orberby)

        sql.push(this.groupby)

        sql.push(this.limit)
        return sql.join(" ");
    }

     get params() {
        return this._params;
    }
}

export default Select;