import { ApartmentServiceInterface } from '../interfaces';
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';
import { RESTService } from '../rest.service';
import { ApartmentModel } from '../models';

@Injectable()
export class ApartmentService extends ApartmentServiceInterface {

    url = '/apartment/';

    constructor(private restService: RESTService) {
        super();
    }

    getList(): Observable<Array<ApartmentModel>> {
        return this.restService.get(this.url)
            .map((res: Response) => <ApartmentModel[]>res.json().map(ap => new ApartmentModel(ap)))
            .catch(RESTService.handleErrorMessage);
    }

    // getSingle(ap: ApartmentModel): Observable<ApartmentModel> {
    //     return this.restService.get(this.url)
    //         .map((res: Response) => <ApartmentModel>res.json())
    //         .catch(RESTService.handleErrorMessage);
    // }

    save(ap: ApartmentModel): Observable<any> {
        return this.restService.post(this.url, ap)
            .map((res: Response) => <any>res.json())
            .catch(RESTService.handleErrorMessage);
    }

    // update(ap: ApartmentModel): Observable<any> {
    //     return this.restService.post(this.url, ap)
    //         .map((res: Response) => <any>res.json())
    //         .catch(RESTService.handleErrorMessage);
    // }

    delete(ap: ApartmentModel): Observable<any> {
        return this.restService.post(this.url + 'delete', ap)
            .map((res: Response) => <any>res.json())
            .catch(RESTService.handleErrorMessage);
    }

}