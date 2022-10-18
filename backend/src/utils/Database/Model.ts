import Build from "./Build";
import Database from "./Database";
import MetaData from './MetaData';
export * from './DataType';

//Credits: https://github.com/sequelize/sequelize
type NonConstructorKeys<T> = ({ [P in keyof T]: T[P] extends new () => any ? never : P })[keyof T]
export type OmitConstructors<T> = Pick<T, NonConstructorKeys<T>>;
export type ModelStatic<M extends Model = Model> = OmitConstructors<typeof Model> & { new(): M };

export type Attributes<M extends Model> = Partial<M['_attributes']>;

export type AttributeType = 'NUMBER' | 'STRING' | 'JSON' | 'DATE' | 'CPF' | 'PHONE' | 'ENUM' | 'INT' | 'FLOAT' 
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
}

export type AttributesWhere<A> = { include: A, exclude?: undefined } | { exclude: A, include?: undefined } | A & { include?: undefined, exclude?: undefined };

export type Where<A> = { or: Where<A> } | { and: Where<A> } | A

export type OptionsWhere<M extends Model, A = Attributes<M>> = {
    where?: Where<A>
    limit?: number
    offset?: number
    attributes?: AttributesWhere<Array<keyof A>>
    groupby?: Array<keyof A>
    order?: Array<[keyof A, "ASC" | "DESC"]>// | [keyof A, "ASC" | "DESC"]
    include?: Include
    raw?: boolean
}

abstract class Model<A extends {} = any>{

    private _values;
    declare _attributes: A;

    set values(values: A) {
        this._values = {};
        for (const key in values) {
            this._values[key] = this.prepareValue(key, values[key]);
        }
        //this._values = values;
    }

    protected prepareValue(key: string, value: any): any {
        const attribute = MetaData.get(this, "attributes")[key] as AttributeConfig;
        switch (attribute.type) {
            case "CPF":
                return value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
            case "PHONE":
                return value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
            case "DATE":
                return new Date(value);
            case "JSON":
                return JSON.parse(value);
            case "INT":
                return parseInt(value);
            case "FLOAT":
                return parseFloat(value);
            case "ENUM":
                return attribute.options.include(value) ? value : "none";
        }
        return value;
    }

    static get attributes(): string[] {
        return Object.keys(MetaData.get(this, "attributes"));
    }

    static get tableName() {
        return MetaData.get(this, "tableName") ?? this.prototype.constructor.name;
    }
    /*
        static init<MS extends ModelStatic<Model>, M extends InstanceType<MS>>(this: MS, attributes: ModelAttributes<M, Attributes<M>>) {
            this.attributes = Object.keys(attributes);
            for (const attribute in attributes) {
                Object.defineProperty(this.prototype, attribute, {
                    get() { return this._values[attribute] },
                    set(value) { this._values[attribute] = value },
                    enumerable: true
                })
            }
        }
    */
    static init() {
    }

    // Retorna os dados Puro
    static async findOne<M extends Model, A extends Attributes<M>>(this: ModelStatic<M>, options: Omit<OptionsWhere<M>, 'raw'> & { raw: true }): Promise<A>;
    // Retorna na Classe do Modelo
    static async findOne<M extends Model, A extends Attributes<M>>(this: ModelStatic<M>, options: Omit<OptionsWhere<M>, 'raw'> & { raw?: false }): Promise<M>;
    static async findOne<M extends Model, A extends Attributes<M>>(this: ModelStatic<M>, options: OptionsWhere<M>): Promise<A | M> {
        const build = new Build(this, options);
        const result = await Database.query(build.toSQL("SELECT"), build.params);
        if (options.raw) return result.rows[0];
        const instance = new this;
        instance.values = result.rows[0];
        return instance;
    }

    // Retorna os dados Puro
    static async findAll<M extends Model, A extends Attributes<M>>(this: ModelStatic<M>, options: Omit<OptionsWhere<M>, 'raw'> & { raw: true }): Promise<A[]>;
    // Retorna na Classe do Modelo
    static async findAll<M extends Model, A extends Attributes<M>>(this: ModelStatic<M>, options: Omit<OptionsWhere<M>, 'raw'> & { raw?: false }): Promise<M[]>;
    static async findAll<M extends Model, A extends Attributes<M>>(this: ModelStatic<M>, options: OptionsWhere<M>): Promise<A[] | M[]> {
        const build = new Build(this, options);
        const result = await Database.query(build.toSQL("SELECT"), build.params);
        if (options.raw) return result.rows;
        const instances = [] as M[];
        for (const row of result.rows) {
            const instance = new this;
            instance.values = row;
            instances.push(instance);
        }
        return instances;

    }

    //abstract validate<T extends any>(field: string, value: T): T;

    toJSON() {
        return this._values;
    }
}
export default Model;