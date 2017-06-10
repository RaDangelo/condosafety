import { PersonModel, PersonTypeModel } from '../models';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

@Injectable()
export abstract class PersonTypeServiceInterface {

    abstract save(ap: PersonTypeModel): Observable<any>;

    abstract getList(): Observable<Array<PersonTypeModel>>;

    abstract delete(ap: PersonTypeModel): Observable<any>;

}