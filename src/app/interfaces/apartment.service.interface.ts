import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { ApartmentModel } from '../models';

@Injectable()
export abstract class ApartmentServiceInterface {

    abstract save(ap: ApartmentModel): Observable<any>;

    abstract getList(): Observable<Array<ApartmentModel>>;

    abstract delete(ap: ApartmentModel): Observable<any>;

}