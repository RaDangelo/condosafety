import { PersonServiceInterface } from '../interfaces';
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';
import { RESTService } from '../rest.service';
import { PersonModel } from '../models';

@Injectable()
export class PersonService extends PersonServiceInterface {

    url = '/person/';

    constructor(private restService: RESTService) {
        super();
    }

    getList(): Observable<Array<PersonModel>> {
        return this.restService.get(this.url)
            .map((res: Response) => <PersonModel[]>res.json().map(p => new PersonModel(p)))
            .catch(RESTService.handleErrorMessage);
    }

    getSingle(person: PersonModel): Observable<PersonModel> {
        return this.restService.get(this.url)
            .map((res: Response) => <PersonModel>res.json())
            .catch(RESTService.handleErrorMessage);
    }

    save(person: PersonModel): Observable<any> {
        return this.restService.post(this.url, person)
            .map((res: Response) => <any>res.json())
            .catch(RESTService.handleErrorMessage);
    }

    update(person: PersonModel): Observable<any> {
        return this.restService.post(this.url, person)
            .map((res: Response) => <any>res.json())
            .catch(RESTService.handleErrorMessage);
    }

    delete(person: PersonModel): Observable<any> {
        return this.restService.delete(this.url + person.id)
            .map((res: Response) => <any>res.json())
            .catch(RESTService.handleErrorMessage);
    }

}