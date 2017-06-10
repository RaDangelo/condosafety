import { PersonModel, PersonTypeModel } from '../models';
import { PersonTypeServiceInterface } from '../interfaces';
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';
import { RESTService } from '../rest.service';

@Injectable()
export class PersonTypeService extends PersonTypeServiceInterface {

    url = '/person-type/';

    constructor(private restService: RESTService) {
        super();
    }

    getList(): Observable<Array<PersonTypeModel>> {
        return this.restService.get(this.url)
            .map((res: Response) => <PersonTypeModel[]>res.json().map(t => new PersonTypeModel(t)))
            .catch(RESTService.handleErrorMessage);
    }

    save(t: PersonTypeModel): Observable<any> {
        return this.restService.post(this.url, t)
            .map((res: Response) => <any>res.json())
            .catch(RESTService.handleErrorMessage);
    }

    delete(t: PersonTypeModel): Observable<any> {
        return this.restService.post(this.url + 'delete', t)
            .map((res: Response) => <any>res.json())
            .catch(RESTService.handleErrorMessage);
    }

}