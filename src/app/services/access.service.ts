import { AccessServiceInterface } from '../interfaces';
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';
import { RESTService } from '../rest.service';
import { UserModel } from '../models';

@Injectable()
export class AccessService extends AccessServiceInterface {

    url = '/access/';

    constructor(private restService: RESTService) {
        super();
    }

    filterData(filter: string): Observable<Array<Object>> {
        return this.restService.get(this.url + 'filter/' + filter)
            .map((res: Response) => <Object[]>res.json().map(data => new Object(data)))
            .catch(RESTService.handleErrorMessage);
    }

    validatePassword(user: UserModel): Observable<boolean> {
        return this.restService.post(this.url + 'validate-pass/', user)
            .map((res: Response) => <boolean>res.json())
            .catch(RESTService.handleErrorMessage);
    }


    // getList(): Observable<Array<PersonModel>> {
    //     return this.restService.get(this.url)
    //         .map((res: Response) => <PersonModel[]>res.json().map(p => new PersonModel(p)))
    //         .catch(RESTService.handleErrorMessage);
    // }

    // getSingle(person: PersonModel): Observable<PersonModel> {
    //     return this.restService.get(this.url)
    //         .map((res: Response) => <PersonModel>res.json())
    //         .catch(RESTService.handleErrorMessage);
    // }

    // save(person: PersonModel): Observable<any> {
    //     return this.restService.post(this.url, person)
    //         .map((res: Response) => <any>res.json())
    //         .catch(RESTService.handleErrorMessage);
    // }

    // update(person: PersonModel): Observable<any> {
    //     return this.restService.post(this.url, person)
    //         .map((res: Response) => <any>res.json())
    //         .catch(RESTService.handleErrorMessage);
    // }

    // delete(person: PersonModel): Observable<any> {
    //     return this.restService.delete(this.url + person.id)
    //         .map((res: Response) => <any>res.json())
    //         .catch(RESTService.handleErrorMessage);
    // }

}