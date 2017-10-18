import { VehicleModel } from './';

export class ApartmentModel {

    _id: string;
    floor: number;
    number: number;
    status: boolean;
    complex?: string;
    type?: string;
    vehicles?: Array<VehicleModel>;

    constructor(apt: ApartmentModel = null) {
        if (apt) {
            this._id = apt._id;
            this.floor = apt.floor;
            this.number = apt.number;
            this.status = apt.status;
            this.complex = apt.complex;
            this.type = apt.type;

            if (apt.vehicles) {
                this.vehicles = apt.vehicles;
            }
        } else {
            this.vehicles = new Array<VehicleModel>();
        }


    }

}