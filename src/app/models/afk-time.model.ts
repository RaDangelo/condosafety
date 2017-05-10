export class AfkTimeModel {
    id: number;
    time: Date;

    constructor(afk: AfkTimeModel = null) {
        this.id = afk.id;
        this.time = afk.time;
    }
}