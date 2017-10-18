import { UserModel, VehicleModel, ApartmentModel, PersonModel, VisitorModel } from './';

export class AccessModel {

    _id: string;
    date: Date;
    user: UserModel;

    apartment?: ApartmentModel;
    vehicle?: VehicleModel;
    person?: PersonModel;
    visitor?: VisitorModel;
    type: AccessType; // ?
    action: AccessAction;

    constructor(access: AccessModel = null) {
        if (access) {
            this._id = access._id;
            this.date = access.date;
            this.type = access.type; // only front?
            this.action = access.action;

            if (access.user) {
                this.user = access.user;
            }

            if (access.vehicle) {
                this.vehicle = access.vehicle;
            }

            if (access.person) {
                this.person = access.person;
            }

            if (access.visitor) {
                this.visitor = access.visitor;
            }

            if (access.apartment) {
                this.apartment = access.apartment;
            }
        } else {
            this.user = new UserModel();
        }
    }
}

export enum AccessType {
    PERSON = 1,
    VEHICLE = 2,
    VISITOR = 3
}

export enum AccessAction {
    DENY = 1,
    ALLOW = 2
}