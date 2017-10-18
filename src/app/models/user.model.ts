export class UserModel {

    _id: string;
    username: string;
    password: string;
    accessLevel: number;

    constructor(user: UserModel = null) {
        if (user) {
            this._id = user._id;
            this.username = user.username;
            this.password = user.password
            this.accessLevel = user.accessLevel;
        }
    }

}