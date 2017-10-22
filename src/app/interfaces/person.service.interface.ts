import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';

import {PersonModel} from '../models';

@Injectable()
export abstract class PersonServiceInterface {

    abstract save(person: PersonModel): Observable<string>;

    abstract getList(): Observable<Array<PersonModel>>;

    abstract delete(person: PersonModel): Observable<any>;
    
}