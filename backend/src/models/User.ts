import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import Database from "../utils/Database/Database";
import Model, { ModelStatic, OptionsWhere, Where } from "../utils/Database/Model";
import { HookSave } from '../utils/Database/Hooks';

export enum UserType {
    user,
    customer,
    employee,
    manager,
    financial,
    trainer
}

export type IUser = {
    cpf: string
    name: string
    password: string
    email: string
    phone: string
}

class User extends Model<IUser> {

    declare cpf: string;
    declare name: string;
    declare password: string;
    declare email: string;
    declare phone: string;

    static readonly tableName = "user";

    async checkPassword(password: string) {
        return await bcrypt.compare(password, this.password);
    }

    async generatePassword(password: string) {
        return this.password = await bcrypt.hash(password, 10);
    }

    getToken() {
        return jwt.sign({
            cpf: this.cpf
        }, process.env.SECRET_AUTH as string, {
            expiresIn: 60 * 60 * 24
        });
    }

    validate<T extends any>(field: string, value: T): T {
        switch (field) {
            case "cpf":
                if (/([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})/.test(value as string))
                    return value;
                throw new Error("CPF Invalido");
        }
        return value;
    }

    static async findEmailorCPF(login: string, where?: Where<User>, options?: Omit<OptionsWhere<User>, 'raw'>) {
        return await User.findOne({
            where: {
                or: {
                    cpf: login,
                    email: login
                },
                ...where
            },
            ...options
        })
    }
}

User.init({
    cpf: "STRING",
    name: "STRING",
    email: "STRING",
    password: "STRING",
    phone: "STRING"
});
/*const pg = new Database("67.23.238.111", "gigachad_user", "x74Gx4a0^", "gigachad_database", { port: 5432 });
(async () => {

    try {

        const result = await User.findAll({
            where: {
                cpf: 'xxx.xxx.xxx-xx'
            },
            limit: 1,
            order: [['cpf', 'DESC']],
            attributes: ["cpf", "email"],
            include: {
                model: User,
                attributes: []
            }
        });
        console.log(result);
        pg.end();
    } catch (e: any) {
        console.log("Error", e)
    }
})();*/
//Database.select(User).attributes("cpf,email").where("cpf=:cpf", { cpf: "xxx.xxx.xxx-xx" }).limit(1).execute();

//console.log(user);
export default User;