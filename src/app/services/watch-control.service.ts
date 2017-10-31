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

    getList(): Observable<Array<WatchControlModel>> {
        return this.restService.get(this.url)
            .map((res: Response) => <WatchControlModel[]>res.json().map(p => new WatchControlModel(p)))
            .catch(RESTService.handleErrorMessage);
    }

    save(watch: WatchControlModel): Observable<any> {
        return this.restService.post(this.url, watch)
            .map((res: Response) => <any>res.json())
            .catch(RESTService.handleErrorMessage);
    }
}