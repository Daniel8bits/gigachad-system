
export enum UserType {
    user,
    customer,
    employee,
    administrative,
    trainer
}

class User {

    type: UserType

    constructor(type: UserType) {
        this.type = type;
    }
}
export default User;
