export class ApartmentModel {

    id: number;
    floor: number;
    number: number;
    status: boolean;
    complex?: number;
    type?: string;

    constructor(apt: ApartmentModel = null) {
        if (apt) {
            this.id = apt.id;
            this.floor = apt.floor;
            this.number = apt.number;
            this.status = apt.status;
            this.complex = apt.complex;
            this.type = apt.type;
        }
    }

}