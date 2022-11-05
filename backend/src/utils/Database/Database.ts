import { Pool, PoolConfig } from 'pg';
import Model, { ModelStatic } from './Model';

class Database {

    private pool: Pool;
    private static instance: Database;

    constructor(host?: string, user?: string, password?: string, database?: string, options?: Omit<PoolConfig, 'host' | 'user' | 'password' | 'database'>, isSave: boolean = true) {
        this.pool = new Pool({
            host,
            user,
            password,
            database,
            ...options
        })
        if (isSave) Database.instance = this;
    
        this.pool.on("connect", () => console.log("⚡️[Database]: Connected"))
    }

    public static async query(query: string, params?: any[]) {
        return await this.instance.pool.query(query, params);
    }

    public static async findOne<M extends Database>(this: M, options) {

    }

    public static select<T extends Model>(model: ModelStatic<T>): DatabaseQuery {
        console.log(new model());
        return new DatabaseQuery
    }

    end() {
        this.pool.end();
    }
}

class DatabaseQuery {


    attributes(attributes: string) {
        return this;
    }

    where(where: string, params: any) {
        return this;
    }

    limit(limit: number) {
        return this;
    }

    orderby() {
        return this;
    }

    execute() {
        return this;
    }
}

export default Database;