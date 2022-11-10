import Model, { ModelStatic, OptionsWhere } from "../Model";

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