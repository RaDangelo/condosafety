import { AfkTimeModel } from '../models/afk-time.model';
import { AFKTimeServiceInterface } from '../interfaces';
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';
import { RESTService } from '../rest.service';

@Injectable()
export class AFKTimeService extends AFKTimeServiceInterface {

    url = '/afk-time/';

    constructor(private restService: RESTService) {
        super();
    }

    save(afk: AfkTimeModel): Observable<any> {
        return this.restService.post(this.url, afk)
            .map((res: Response) => <any>res.json())
            .catch(RESTService.handleErrorMessage);
    }

    get(): Observable<AfkTimeModel> {
        return this.restService.get(this.url)
            .map((res: Response) => <AfkTimeModel>res.json())
            .catch(RESTService.handleErrorMessage);
    }
}