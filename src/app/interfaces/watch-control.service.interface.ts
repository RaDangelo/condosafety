import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { WatchControlModel } from '../models';

@Injectable()
export abstract class WatchControlServiceInterface {

    abstract save(watch: WatchControlModel): Observable<any>;

    abstract getList(): Observable<Array<WatchControlModel>>;

}