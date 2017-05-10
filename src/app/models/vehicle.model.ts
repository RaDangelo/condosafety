import { ApartmentModel } from './';

export class VehicleModel {

    id: number;
    plate: string;
    color: string;
    brand: string;
    status: boolean;
    apartment: ApartmentModel;
    picture?: File;

    constructor(vehicle: VehicleModel = null) {
        if (vehicle) {
            this.id = vehicle.id;
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