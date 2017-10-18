import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { VisitorModel } from '../models';

@Injectable()
export abstract class VisitorServiceInterface {

    abstract save(visitor: VisitorModel): Observable<string>;

    abstract getList(): Observable<Array<VisitorModel>>;

    abstract delete(visitor: VisitorModel): Observable<any>;

}