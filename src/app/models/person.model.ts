import { ApartmentModel, PersonTypeModel } from './';

export class PersonModel {

    _id: string;
    name: string;
    nickname: string;
    accessPassword: string;
    phoneNumber: string;
    cpf: string;
    email: string;
    picture: File;
    status: boolean;
    personType: PersonTypeModel;
    apartment: ApartmentModel;

    constructor(person: PersonModel = null) {
        if (person) {
            this._id = person._id;
            this.nickname = person.nickname;
            this.name = person.name;
            this.accessPassword = person.accessPassword;
            this.phoneNumber = person.phoneNumber;
            this.email = person.email;
            this.picture = person.picture;
            this.status = person.status;
            this.cpf = person.cpf;

            if (person.personType) {
                this.personType = person.personType;
            }
            if (person.apartment) {
                this.apartment = person.apartment;
            }
        }
    }
}
