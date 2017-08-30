import { ApartmentModel } from './';

export class VehicleModel {

    _id: number;
    plate: string;
    color: string;
    brand: string;
    status: boolean;
    // type: ENUM? 
    apartment: ApartmentModel;
    picture?: File;

    constructor(vehicle: VehicleModel = null) {
        if (vehicle) {
            this._id = vehicle._id;
            this.plate = vehicle.plate;
            this.color = vehicle.color;
            this.brand = vehicle.brand;
            this.status = vehicle.status;
            this.picture = vehicle.picture;

             if (vehicle.apartment) {
                this.apartment = vehicle.apartment;
            }
        } 
        
    }

}