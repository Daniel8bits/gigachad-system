import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Database from '../utils/Database/Database';
import Model, { DataType, OptionsWhere, PrimarKey, TableName, Where } from "../utils/Database/Model";
import Administrative from './Administrative';
import Customer from './Customer';
import Trainer from './Trainer';
import { IUser, UserType } from 'gigachad-shareds/models'

class Users<A extends IUser = IUser> extends Model<A> {

    @PrimarKey
    @DataType("CPF")
    declare cpf: string;
    @DataType("STRING")
    declare name: string;
    @DataType("STRING")
    declare password: string;
    @DataType("STRING")
    declare email: string;
    @DataType("PHONE")
    declare phone: string;
    @DataType("STRING", {virtual: true})
    declare type: UserType;
    @DataType("CLASS", { virtual: true })
    declare Administrative: Administrative;
    @DataType("CLASS", { virtual: true })
    declare Customer: Customer;
    @DataType("CLASS", { virtual: true })
    declare Trainer: Trainer;

    init() {
        this.type = UserType.user;        
        if (this.Trainer) {
            this.type = UserType.trainer;
        } else
            if (this.Administrative) {
                switch (this.Administrative.role) {
                    case "financer":
                        this.type = UserType.financer;
                        break;
                    case "attendant":
                        this.type = UserType.attendant;
                        break;
                    case "manager":
                        this.type = UserType.manager;
                        break;
                }
            } else
                if (this.Customer) {
                    this.type = UserType.customer;
                }
    }

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

    static async findEmailorCPF(login: string, where?: Where<Users>, options?: Omit<OptionsWhere<Users>, 'raw'>) {
        return await Users.findOne({
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

/*
const pg = new Database("67.23.238.111", "gigachad_user", "x74Gx4a0^", "gigachad_database", { port: 5432 });
(async () => {

    try {
/*
        const result = await User.findOne({
            where: {
                cpf: '74176465069'
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
        await User.update({
            cpf: "032.3123.3232",
            email: "lucasalp1@hotmail.com"
        },{
            where:{
                cpf: "3121312"
            }
        })
        pg.end();
    } catch (e: any) {
        console.log("Error", e)
    }
})();
/*
//Database.select(User).attributes("cpf,email").where("cpf=:cpf", { cpf: "xxx.xxx.xxx-xx" }).limit(1).execute();
*/
//console.log(user);
export default Users;
