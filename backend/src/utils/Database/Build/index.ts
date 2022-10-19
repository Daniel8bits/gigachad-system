import {database as MetaData} from "../../MetaData";
import Model, { ModelStatic, OptionsWhere, Where } from "../Model";

export type BuildType = "SELECT" | "UPDATE" | "INSERT" | "DELETE";
abstract class Build<M extends Model> {

    protected model: ModelStatic<M>;
    protected options: OptionsWhere<M>;
    // private _where: string = "";
    // private _params: string[] = [];
    // private type: BuildType;

    constructor(model: ModelStatic<M>, options: OptionsWhere<M>) {
        this.model = model;
        this.options = options;
       // this.prepareWhere();
    }

    // prepareWhere() {
    //     this._where = this.buildWhere(this.options.where);
    // }

    // buildWhere(wheres: Where<any>, or: boolean = true): string {
    //     const where: string[] = [];
    //     const attributes = MetaData.get(this.model, "attributes");
    //     for (let field in wheres) {
    //         const value = wheres[field];
    //         if (field == "or" || field == "and") {
    //             where.push("(" + this.buildWhere(value, field === "or") + ")");
    //         } else if (value) {
    //             const index = this._params.push(this.model.encode(field, value, attributes[field]));
    //             where.push(field + " = $" + index);
    //         }
    //     }
    //     return where.join(or ? " OR " : " AND ");
    // }
    /*
        set limit(limit: number, offset: number | undefined = undefined) {
            this.options.limit = limit;
            this.options.offset = offset;
        }*/

    // get attributes(): string {
    //     const { attributes } = this.options;
    //     if (attributes) {
    //         if (attributes.include) return attributes.include.join(",");
    //         if (attributes.exclude) return this.model.attributes.filter((field) => !attributes.exclude.includes(field)).join(",");
    //         return attributes.join(",");
    //     }
    //     return "*";
    // }

    // get from(): string {
    //     return "FROM public." + this.model.tableName;
    // }

    // get where(): string {
    //     if (this.options.where) {
    //         return "WHERE " + this._where;
    //     }
    //     return "";
    // }

    // get orberby(): string {
    //     const { order } = this.options;
    //     if (order) {
    //         const sql: string[] = [];
    //         for (let [field, orderby] of order) {
    //             sql.push((field as string) + " " + orderby);
    //         }
    //         return "ORDER BY " + sql.join(", ");
    //     }
    //     return "";
    // }

    // get groupby(): string {
    //     if (this.options.groupby) {
    //         return "GROUP BY " + this.options.groupby;
    //     }
    //     return "";
    // }

    // get limit(): string {
    //     const { limit, offset } = this.options;
    //     if (limit) return "LIMIT " + limit + (offset ? ", " + offset : "");
    //     return "";
    // }

    // get names(): string {
    //     return "()";
    // }

    // get values(): string {
    //     return "";
    // }

    abstract toSQL(): string;

    // toSQL(): string {
    //     const type = this.type;
    //     const sql: (string | number)[] = [];

    //     sql.push(type);
    //     if (type == "INSERT") {
    //         sql.push(this.names);
    //         sql.push("VALUES");
    //         sql.push(this.values);
    //     } else {
    //         if (type == "SELECT") sql.push(this.attributes)
    //         if (type == "SELECT" || type == "DELETE") sql.push(this.from)
    //         else sql.push(this.model.tableName)
    //         sql.push(this.where)

    //         sql.push(this.orberby)

    //         sql.push(this.groupby)

    //         sql.push(this.limit)
    //     }
    //     return sql.join(" ");
    //     /*
    //     SELECT .. FROM .. WHERE .. 
    //     UPDATE ... SET ... WHERE ...
    //     DELETE FROM ... WHERE ...
    //     INSERT ... (...) VALUES (...)
    //     */
    // }

    // get params() {
    //     return this._params;
    // }
}

export default Build;
export {default as Select} from './Select';
export {default as Insert} from './Insert';
export {default as Update} from './Update';
export {default as Delete} from './Delete';