import { database as MetaData } from "../MetaData";
import Model, { AttributeType } from "./Model";

export function enumerable(value: boolean) {
    return function (target: Model, propertyKey: string) {
        let descriptor = Object.getOwnPropertyDescriptor(target, propertyKey) || {};
        if (descriptor.enumerable != value) {
            descriptor.enumerable = value;
            descriptor.writable = true;
            Object.defineProperty(target, propertyKey, descriptor)
        }
    };
}

export function DataType(type: AttributeType, options?: any) {
    return function (target: Model, propertyKey: string) {
        propertyKey = propertyKey.toLocaleLowerCase();
        if(!options?.virtual){
            // Salva o metadado
            const attributes = MetaData.get(target, "attributes") ?? {};
            attributes[propertyKey] = { type, options };
            MetaData.add(target, "attributes", attributes);
        }

        // Define o getter e setter
        Object.defineProperty(target, propertyKey, {
            get() { return this._values[propertyKey] },
            set(value) { this._values[propertyKey] = value },
            enumerable: true
        })
    };
}

export function TableName(name: string) {
    return function (constructor: Function) {
        MetaData.add(constructor, "tableName", name);
    }
}

export function PrimarKey(target: Model, propertyKey: string) {
    propertyKey = propertyKey.toLocaleLowerCase();
    const primarykey = MetaData.get(target, "primaryKey") ?? [];
    primarykey.push(propertyKey);
    MetaData.add(target, "primarykey", primarykey);
}