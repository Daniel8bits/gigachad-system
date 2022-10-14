import { Pool, PoolConfig } from 'pg';

class Database {

    private pool: Pool;
    private static instance: Database;

    constructor(host: string, user: string, password: string, database: string, options: Omit<PoolConfig, 'host' | 'user' | 'password' | 'database'>, isSave: boolean = true) {
        this.pool = new Pool({
            host,
            user,
            password,
            database,
            ...options
        })
        if (isSave) Database.instance = this;
        this.pool.on("connect", () => console.log("⚡️[server]: Connected"))
    }

    public static async query(query: string, params?: any[]) {
        return await this.instance.pool.query(query, params);
    }

    public static async findOne<M extends Database>(this: M, options) {
        
    }
}

export default Database;