export class AfkTimeModel {
    _id: number;
    time: number;

    constructor(afk: AfkTimeModel = null) {
        if (afk) {
            this._id = afk._id;
            this.time = afk.time;
        }
    }
}