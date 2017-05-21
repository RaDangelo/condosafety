export class AfkTimeModel {
    _id: number;
    time: Date;

    constructor(afk: AfkTimeModel = null) {
        this._id = afk._id;
        this.time = afk.time;
    }
}