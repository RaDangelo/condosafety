import { ApartmentModel } from './';

export class VehicleModel {

    _id: string;
    plate: string;
    color: string;
    brand: string;
    status: boolean;
    apartment: ApartmentModel;
    picture?: string;
    type: VehicleTypeEnum;

    constructor(vehicle: VehicleModel = null) {
        if (vehicle) {
            this._id = vehicle._id;
            this.plate = vehicle.plate;
            this.color = vehicle.color;
            this.brand = vehicle.brand;
            this.status = vehicle.status;
            this.picture = vehicle.picture;
            this.type = vehicle.type;
            if (vehicle.apartment) {
                this.apartment = vehicle.apartment;
            }
        }

    }
}

export enum VehicleTypeEnum {
    CARRO = 1,
    MOTO = 2
}
