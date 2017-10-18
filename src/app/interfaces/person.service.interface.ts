import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';

import {PersonModel} from '../models';

@Injectable()
export abstract class PersonServiceInterface {

    abstract save(person: PersonModel): Observable<string>;

    abstract getList(): Observable<Array<PersonModel>>;

    abstract getSingle (person: PersonModel): Observable<PersonModel>;    

    abstract update(person: PersonModel): Observable<any>;

    abstract delete(person: PersonModel): Observable<any>;
    
}