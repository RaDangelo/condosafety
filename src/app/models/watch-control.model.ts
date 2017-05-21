import { UserModel } from './';

export class WatchControlModel {

    _id: number;
    user: UserModel;
    date: Date;
    action: Action;
    obs?: string;
    duration: Date;

    constructor(watch: WatchControlModel = null) {
        if (watch) {
            this._id = watch._id;
            this.date = watch.date;
            this.action = watch.action;
            this.obs = watch.obs;
            this.duration = watch.duration;

            if (watch.user) {
                this.user = watch.user;
            }
        }
    }
}

export enum Action {
    LOGIN = 0,
    LOGOUT = 1,
    AFK = 2
}