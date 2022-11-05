class MetaData {

    private data = {};

    private static metaData: Map<string, MetaData> = new Map<string, MetaData>();

    constructor(name: string) {
        MetaData.metaData.set(name, this);
    }

    add(target: any, name: string, value: any) {
        const nameTarget = typeof target === "string" ? target : (target.prototype ?? target).constructor.name;
        if (this.data[nameTarget] == undefined) this.data[nameTarget] = {};
        this.data[nameTarget][name] = value;
    }

    get(target: any, name?: string) {
        const nameTarget = typeof target === "string" ? target : (target.prototype ?? target).constructor.name;
        if (target == "") throw new Error("Modelo não reconhecido")
        if (!this.data[nameTarget]) return undefined;
        if (name) return this.data[nameTarget][name] ?? undefined;
        return this.data[nameTarget] ?? undefined;
    }
}

export default {
    database: new MetaData("Database"),
    route: new MetaData("Route")
};
export {MetaData}