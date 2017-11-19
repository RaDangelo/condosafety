import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { UserModel, AccessModel } from '../models';

@Injectable()
export abstract class AccessServiceInterface {

    abstract filterData(filter: string): Observable<Object[]>;

    abstract getList(filter: AccessModel): Observable<AccessModel[]>;

    abstract validatePassword(user: UserModel): Observable<boolean>;

    abstract insertAccess(access: AccessModel): Observable<boolean>;

}