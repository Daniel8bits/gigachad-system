class MetaData {

    private static data = {};

    static add(target: any, name: string, value: any) {
        const nameTarget = (target.prototype ?? target).constructor.name;
        if (this.data[nameTarget] == undefined) this.data[nameTarget] = {};
        this.data[nameTarget][name] = value;
    }

    static get(target: any, name?: string) {
        const nameTarget = (target.prototype ?? target).constructor.name;
        if(!this.data[nameTarget]) return undefined;
        if (name) return this.data[nameTarget][name] ?? undefined;
        return this.data[nameTarget] ?? undefined;
    }
}

export default MetaData;