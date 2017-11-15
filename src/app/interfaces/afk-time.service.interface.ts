import { AfkTimeModel, WatchControlModel } from '../models/';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

@Injectable()
export abstract class AFKTimeServiceInterface {

    abstract save(afk: AfkTimeModel): Observable<any>;

    abstract unfreeze(watch: WatchControlModel): Observable<any>;

    abstract get(): Observable<AfkTimeModel>;

}