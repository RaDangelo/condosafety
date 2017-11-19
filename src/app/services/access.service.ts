import { AccessServiceInterface } from '../interfaces';
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';
import { RESTService } from '../rest.service';
import { UserModel, AccessModel } from '../models';

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

    insertAccess(access: AccessModel): Observable<boolean> {
        return this.restService.post(this.url, access)
            .map((res: Response) => <boolean>res.json())
            .catch(RESTService.handleErrorMessage);
    }

    getList(filter: AccessModel): Observable<AccessModel[]> {
        return this.restService.post(this.url + 'report', filter)
            .map((res: Response) => <AccessModel[]>res.json().map(data => new AccessModel(data)))
            .catch(RESTService.handleErrorMessage);
    }
}