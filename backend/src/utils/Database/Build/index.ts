import { database as MetaData } from "../../MetaData";
import Model, { ModelStatic, OptionsWhere, Where } from "../Model";

export type BuildType = "SELECT" | "UPDATE" | "INSERT" | "DELETE";
abstract class Build<M extends Model> {

    protected model: ModelStatic<M>;
    protected options: OptionsWhere<M>;
    protected _models: Record<string, ModelStatic<any>> = {};


    constructor(model: ModelStatic<M>, options: OptionsWhere<M>) {
        this.model = model;
        this.options = options;
        this.prepareModels();
    }

    prepareModels() {
        this._models[this.model.tableName] = this.model;
        const includes = this.options.include ?? [];
        for (const include of includes) {
            this._models[include.model.tableName] = include.model;
        }
        console.log(this._models);
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

    get models() {
        return this._models;
    }
}

export default Build;
export { default as Select } from './Select';
export { default as Insert } from './Insert';
export { default as Update } from './Update';
export { default as Delete } from './Delete';