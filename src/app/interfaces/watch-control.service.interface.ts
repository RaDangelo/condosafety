import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { WatchControlModel } from '../models';

@Injectable()
export abstract class WatchControlServiceInterface {

    abstract getList(filter: WatchControlModel): Observable<WatchControlModel[]>;

    abstract logout(watch: WatchControlModel): Observable<any>;

}
