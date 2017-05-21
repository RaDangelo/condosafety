export class PersonTypeModel {

    _id: number;
    type: string;

    constructor(type: PersonTypeModel = null) {
        if (type) {
            this._id = type._id;
            this.type = type.type;
        }
    }
}