import { VisitorServiceInterface } from '../interfaces';
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';
import { RESTService } from '../rest.service';
import { VisitorModel } from '../models';

@Injectable()
export class VisitorService extends VisitorServiceInterface {

    url = '/visitor/';

    constructor(private restService: RESTService) {
        super();
    }

    getList(): Observable<Array<VisitorModel>> {
        return this.restService.get(this.url)
            .map((res: Response) => <VisitorModel[]>res.json().map(v => new VisitorModel(v)))
            .catch(RESTService.handleErrorMessage);
    }

    save(visitor: VisitorModel): Observable<string> {
        return this.restService.post(this.url, visitor)
            .map((res: Response) => <string>res.json())
            .catch(RESTService.handleErrorMessage);
    }

    delete(v: VisitorModel): Observable<any> {
        return this.restService.post(this.url + 'delete', v)
            .map((res: Response) => <any>res.json())
            .catch(RESTService.handleErrorMessage);
    }

}