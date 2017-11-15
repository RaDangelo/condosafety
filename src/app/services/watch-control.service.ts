import { WatchControlServiceInterface } from '../interfaces';
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';
import { RESTService } from '../rest.service';
import { WatchControlModel } from '../models';

@Injectable()
export class WatchControlService extends WatchControlServiceInterface {

    url = '/watch-control/';

    constructor(private restService: RESTService) {
        super();
    }

    getList(filter: WatchControlModel): Observable<Array<WatchControlModel>> {
        return this.restService.post(this.url, filter)
            .map((res: Response) => <WatchControlModel[]>res.json().map(w => new WatchControlModel(w)))
            .catch(RESTService.handleErrorMessage);
    }
}