import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { ApartmentModel } from '../models';

@Injectable()
export abstract class ApartmentServiceInterface {

    abstract save(ap: ApartmentModel): Observable<any>;

    abstract getList(): Observable<Array<ApartmentModel>>;

    // abstract getSingle (ap: ApartmentModel): Observable<ApartmentModel>;    

    // abstract update(ap: ApartmentModel): Observable<any>;

    abstract delete(ap: ApartmentModel): Observable<any>;

}