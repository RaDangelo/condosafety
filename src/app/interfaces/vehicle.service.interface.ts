import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { VehicleModel } from '../models';

@Injectable()
export abstract class VehicleServiceInterface {

    abstract save(v: VehicleModel): Observable<any>;

    abstract getList(): Observable<Array<VehicleModel>>;

    abstract getUploadEndpoint(): string;

    abstract delete(v: VehicleModel): Observable<any>;

}