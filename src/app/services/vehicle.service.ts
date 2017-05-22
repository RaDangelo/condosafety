import { VehicleServiceInterface } from '../interfaces';
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';
import { RESTService } from '../rest.service';
import { VehicleModel } from '../models';

@Injectable()
export class VehicleService extends VehicleServiceInterface {

    url = '/vehicle/';

    constructor(private restService: RESTService) {
        super();
    }

    getList(): Observable<Array<VehicleModel>> {
        return this.restService.get(this.url)
            .map((res: Response) => <VehicleModel[]>res.json().map(v => new VehicleModel(v)))
            .catch(RESTService.handleErrorMessage);
    }

    // getSingle(person: VehicleModel): Observable<VehicleModel> {
    //     return this.restService.get(this.url)
    //         .map((res: Response) => <VehicleModel>res.json())
    //         .catch(RESTService.handleErrorMessage);
    // }

    save(v: VehicleModel): Observable<any> {
        return this.restService.post(this.url, v)
            .map((res: Response) => <any>res.json())
            .catch(RESTService.handleErrorMessage);
    }

    // update(person: VehicleModel): Observable<any> {
    //     return this.restService.post(this.url, person)
    //         .map((res: Response) => <any>res.json())
    //         .catch(RESTService.handleErrorMessage);
    // }

    delete(v: VehicleModel): Observable<any> {
        return this.restService.post(this.url + 'delete', v)
            .map((res: Response) => <any>res.json())
            .catch(RESTService.handleErrorMessage);
    }

}