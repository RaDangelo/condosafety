export class PersonTypeModel {

    _id: string;
    type: string;

    constructor(type: PersonTypeModel = null) {
        if (type) {
            this._id = type._id;
            this.type = type.type;
        }
    }
}