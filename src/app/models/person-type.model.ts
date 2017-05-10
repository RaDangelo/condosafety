export class PersonTypeModel {

    id: number;
    type: string;

    constructor(type: PersonTypeModel = null) {
        if (type) {
            this.id = type.id;
            this.type = type.type;
        }
    }
}