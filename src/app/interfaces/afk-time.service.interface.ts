import { AfkTimeModel } from '../models/afk-time.model';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

@Injectable()
export abstract class AFKTimeServiceInterface {

    abstract save(afk: AfkTimeModel): Observable<any>;

    abstract get(): Observable<AfkTimeModel>;

}