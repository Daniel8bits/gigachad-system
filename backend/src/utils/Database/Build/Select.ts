import Model, { Attributes, ModelStatic, OptionsWhere, Where } from "../Model";
import Build from "./index";

class Select<M extends Model> extends Build<M>{

    protected _where: string[] = [];
    protected _params: string[] = [];

    constructor(model: ModelStatic<M>, options: OptionsWhere<M>) {
        super(model, options);
        this.prepareWhere();
    }


    prepareWhere() {
        this._where.push(this.buildWhere(this.options.where, this.model.tableName));
        const includes = this.options.include ?? [];
        for (const include of includes) {
            this._where.push(this.buildWhere(include.where, include.model.tableName))
        }

        this._where = this._where.filter((value) => value != "");
    }

    buildWhere(wheres: Where<any>, tableName: string, or: boolean = false): string {
        const where: string[] = [];
        for (let field in wheres) {
            const value = wheres[field];
            if (value == undefined) continue;
            if (field == "or" || field == "and") {
                const build = this.buildWhere(value, tableName, field === "or");
                if (build) where.push("(" + build + ")");
            } else if (value) {
                if (typeof value == "object") {
                    if(value.value == undefined) continue;
                    const index = this._params.push(Model.encode(field, value.value, this.model));
                    where.push(tableName + "." + field + " " + value.op + " $" + index);
                } else {
                    if (field == "isNull") {
                        where.push(tableName + "." + value + " IS NULL")
                    } else {
                        const index = this._params.push(Model.encode(field, value, this.model));
                        where.push(tableName + "." + field + " = $" + index);
                    }
                }
            }
        }
        return where.join(or ? " OR " : " AND ");
    }

    attributeName(tableName: string, field: string) {
        return tableName + "." + field + " as \"" + tableName + "." + field + "\""
    }

    getAttributes(attributes: string[], tableName: string, config?: Attributes<any>): string {
        //        if (attributes.include) return tableName + "." + attributes.include.join(",tableName.");
        if (config) {
            if (config.exclude) return attributes.filter((field) => !config.exclude.includes(field)).map((field) => this.attributeName(tableName, field)).join(",");
            return config.map((field) => this.attributeName(tableName, field)).join();
        }
        return attributes.map((field) => this.attributeName(tableName, field)).join(",");
    }

    get attributes(): string {
        const attributes: string[] = [];
        const tableName = this.model.tableName;
        attributes.push(this.getAttributes(this.model.attributes, tableName, this.options.attributes));
        const includes = this.options.include ?? [];
        for (const include of includes) {
            attributes.push(this.getAttributes(include.model.attributes, include.model.tableName, include.attributes))
        }

        return attributes.join();
    }

    get from(): string {
        return "FROM public." + this.model.tableName;
    }

    get join(): string {
        /*
        const pk = MetaData.get(this.model, "primarykey");
        console.log(this.model, pk);
        */
        const includes = this.options.include ?? [];
        const sql: string[] = [];
        for (const include of includes) {
            sql.push((include.required ? "" : "LEFT") + " JOIN " + include.model.tableName + " ON " + include.on);
        }
        return sql.join(" ");//"INNER LEFT JOIN ON ...";
    }

    get where(): string {
        if (this._where.length >= 1) {
            return "WHERE " + this._where.join("");
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
            return "GROUP BY " + this.model.tableName+"."+this.options.groupby.join(","+this.model.tableName+".");
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

        /*
        SELECT * FROM user INNER
        LEFT
        RIGHT

        JOin

        INNER LEFT JOIN ...



        */
        sql.push("SELECT");
        sql.push(this.attributes)
        sql.push(this.from)
        sql.push(this.join);
        sql.push(this.where)
        
        sql.push(this.groupby)
        sql.push(this.orberby)

        sql.push(this.limit)
        if (this.options.debug) console.log(sql.join(" "),this.params)
        return sql.join(" ");
    }

    get params() {
        return this._params;
    }
}

export default Select;