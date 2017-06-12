import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { UserModel } from '../models';

// import {AccessModel} from '../models';

@Injectable()
export abstract class AccessServiceInterface {

    abstract filterData(filter: string): Observable<Object[]>;

    abstract validatePassword(user: UserModel): Observable<boolean>;

    // abstract save(person: PersonModel): Observable<any>;

    // abstract getList(): Observable<Array<PersonModel>>;

    // abstract getSingle (person: PersonModel): Observable<PersonModel>;    

    // abstract update(person: PersonModel): Observable<any>;

    // abstract delete(person: PersonModel): Observable<any>;

}