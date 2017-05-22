import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { VehicleModel } from '../models';

@Injectable()
export abstract class VehicleServiceInterface {

    abstract save(v: VehicleModel): Observable<any>;

    abstract getList(): Observable<Array<VehicleModel>>;

    // abstract getSingle (v: VehicleModel): Observable<VehicleModel>;    

    // abstract update(v: VehicleModel): Observable<any>;

    abstract delete(v: VehicleModel): Observable<any>;

}