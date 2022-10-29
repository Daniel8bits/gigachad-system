import { Delete, Insert, Select, Update } from "./Build";
import Database from "./Database";
import MetaData from '../MetaData';
export * from './DataType';

//Credits: https://github.com/sequelize/sequelize
type NonConstructorKeys<T> = ({ [P in keyof T]: T[P] extends new () => any ? never : P })[keyof T]
export type OmitConstructors<T> = Pick<T, NonConstructorKeys<T>>;
export type ModelStatic<M extends Model = Model> = OmitConstructors<typeof Model> & { new(): M };

export type Attributes<M extends Model> = Partial<M['_attributes']>;

export type AttributeType = 'NUMBER' | 'STRING' | 'JSON' | 'DATE' | 'CPF' | 'PHONE' | 'ENUM' | 'INT' | 'FLOAT' | 'BOOLEAN' | 'CLASS'
export type AttributeConfig = {
    type: AttributeType
    options?: any
}

export type DataAttributes = {
    type: AttributeType
    primaryKey?: boolean
    allowNull?: boolean
    field?: string
}
export type ModelAttributes<M extends Model = Model, TAttributes = any> = {
    /**
     * The description of a database column
     */
    [name in keyof TAttributes]: AttributeType | DataAttributes
};

export type Include<M extends Model = Model> = OptionsWhere<M> & {
    model: ModelStatic<M>
    on: string
    required?: boolean
}

export type AttributesWhere<A> = { include: A, exclude?: undefined } | { exclude: A, include?: undefined } | A & { include?: undefined, exclude?: undefined };

export type Where<A> = { or: Where<A> } | { and: Where<A> } | A /*| {
    [key in keyof A]: {
        or?: A[],
        and?: A[]
    }
}*/

export type OptionsWhere<M extends Model, A = Attributes<M>> = {
    where?: Where<A>
    limit?: number
    offset?: number
    attributes?: AttributesWhere<Array<keyof A>>
    groupby?: Array<keyof A>
    order?: Array<[keyof A, "ASC" | "DESC"]>// | [keyof A, "ASC" | "DESC"]
    include?: Array<Include>
    raw?: boolean
}

abstract class Model<A extends {} = any>{

    private _values = {};
    declare _attributes: A;

    setValue(key: string, value: any) {
        this._values[key] = Model.decode(key, value, this.constructor.name);
    }

    setValues(values: A, models: Record<string, ModelStatic<any>>) {
        this._values = {};
        // const attributes = Metadata.database.get(this, "attributes") as Record<string, AttributeConfig>;
        for (const key in values) {
            const [table, field] = key.split(".");
            if (field == undefined) {
                const value = Model.decode(table, values[key], this.constructor.name);
                this._values[table] = value
            } else if (table === this.constructor.name) {
                const value = Model.decode(field, values[key], this.constructor.name);
                this._values[field] = value
            } else {
                const value = Model.decode(field, values[key], table);
                if (value == null) continue;
                //const value = Model.decode(field, values[key], attributes[key]);
                if (this._values[table] === undefined) this._values[table] = new models[table]() as Model;
                this._values[table].setValue(field, value);
            }
        }
        //this._values = values;
    }

    // Database -> Application
    static decode(key: string, value: any, target: any): any {
        if (value == null) return null;
        const attribute = MetaData.database.get(target, "attributes")[key.toLocaleLowerCase()] as AttributeConfig;
        if (!attribute) throw new Error("Column " + key + " not exists");
        switch (attribute.type) {
            case "CPF":
                return value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
            case "PHONE":
                return value.replace(/(\d{2})(\d{2})(\d{5})(\d{4})/, "+$1 ($2) $3-$4");
            case "DATE":
                return new Date(value);
            // case "JSON":
            //    return JSON.parse(value);
            case "INT":
                return parseInt(value);
            case "FLOAT":
                return parseFloat(value);
            case "ENUM":
                return attribute.options.includes(value) ? value : "none";
        }

        return value;
    }

    // Application -> Database
    static encode(key: string, value: any, target?: any): any {
        if (value == null) return null;
        const attribute = MetaData.database.get(target, "attributes")[key.toLocaleLowerCase()] as AttributeConfig;
        if (!attribute) throw new Error("Column " + key + " not exists");

        switch (attribute.type) {
            case "CPF":
                return value.replace(/(\d{3}).(\d{3}).(\d{3})-(\d{2})/, "$1$2$3$4");
            case "PHONE":
                return value.replace(/\+(\d{2}) \((\d{2})\) (\d{5})-(\d{4})/, "$1$2$3$4");
            case "DATE":
                return new Date(value).toDateString();
            case "JSON":
                return JSON.stringify(value);
        }

        return value;
    }

    static get attributes(): string[] {
        return Object.keys(MetaData.database.get(this, "attributes"));
    }

    static get tableName() {
        return MetaData.database.get(this, "tableName") ?? this.prototype.constructor.name;
    }


    // Retorna os dados Puro
    static async findOne<M extends Model, A extends Attributes<M>>(this: ModelStatic<M>, options: Omit<OptionsWhere<M>, 'raw'> & { raw: true }): Promise<A | false>;
    // Retorna na Classe do Modelo
    static async findOne<M extends Model, A extends Attributes<M>>(this: ModelStatic<M>, options: Omit<OptionsWhere<M>, 'raw'> & { raw?: false }): Promise<M | false>;
    static async findOne<M extends Model, A extends Attributes<M>>(this: ModelStatic<M>, options: OptionsWhere<M>): Promise<A | M | false> {
        options.limit = 1;
        //@ts-ignore
        const instances = await this.findAll<M, A>(options);
        return instances[0];
        /* const build = new Select(this, options);
        const result = await Database.query(build.toSQL(), build.params);
        if (options.raw) return result.rows[0];
        if (result.rowCount == 0) return false;
        const instance = new this;
        instance.setValues(result.rows[0], build.models);
        return instance;*/
    }

    // Retorna os dados Puro
    static async findAll<M extends Model, A extends Attributes<M>>(this: ModelStatic<M>, options: Omit<OptionsWhere<M>, 'raw'> & { raw: true }): Promise<A[]>;
    // Retorna na Classe do Modelo
    static async findAll<M extends Model, A extends Attributes<M>>(this: ModelStatic<M>, options: Omit<OptionsWhere<M>, 'raw'> & { raw?: false }): Promise<M[]>;
    static async findAll<M extends Model, A extends Attributes<M>>(this: ModelStatic<M>, options: OptionsWhere<M>): Promise<A[] | M[]> {
        const build = new Select(this, options);
        const result = await Database.query(build.toSQL(), build.params);
        if (options.raw) return result.rows;
        if (result.rowCount == 0) return [];

        const instances = [] as M[];
        for (const row of result.rows) {
            const instance = new this;
            instance.setValues(row, build.models);
            instances.push(instance);
        }
        return instances;
    }

    static async count<M extends Model, A extends Attributes<M>>(this: ModelStatic<M>, options: Omit<OptionsWhere<M>, 'raw'>): Promise<number> {
        const build = new Select(this, options);
        const result = await Database.query(build.toSQL(), build.params);
        return result.rowCount;
    }

    static async create<M extends Model, A extends Attributes<M>>(this: ModelStatic<M>, values: A): Promise<M | false> {
        const build = new Insert(this, values);
        const result = await Database.query(build.toSQL(), build.params);
        if (result.rowCount == 0) return false;
        const instance = new this;
        instance.setValues(result.rows[0], build.models);
        return instance;
    }

    static async findOrCreate<M extends Model, A extends Attributes<M>>(this: ModelStatic<M>, values: A, where: Where<A>): Promise<M | false> {
        const item = await this.findOne<M, A>({ where });
        if (item) return item;
        return await this.create<M, A>(values);
    }

    static async update<M extends Model, A extends Attributes<M>>(this: ModelStatic<M>, values: A, options: OptionsWhere<M>): Promise<M | false> {
        const build = new Update(this, values, options);
        const result = await Database.query(build.toSQL(), build.params);
        if (result.rowCount == 0) return false;
        const instance = new this;
        instance.setValues(result.rows[0], build.models);
        return instance;
    }

    static async delete<M extends Model>(this: ModelStatic<M>, options: OptionsWhere<M>): Promise<boolean> {
        const build = new Delete(this, { limit: 1, ...options });
        const result = await Database.query(build.toSQL(), build.params);
        return result.rowCount !== 0
    }

    toJSON() {
        return this._values;
    }
}
export default Model;