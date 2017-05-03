export class UserModel {

    id: number;
    username: string;
    password: string;
    accessLevel: number;

    constructor(user: UserModel = null) {
        if (user) {
            this.id = user.id;
            this.username = user.username;
            this.password = user.password
            this.accessLevel = user.accessLevel;
        }
    }

}