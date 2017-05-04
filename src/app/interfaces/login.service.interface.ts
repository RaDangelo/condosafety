import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

import { UserModel } from '../models';

@Injectable()
export abstract class LoginServiceInterface {

    abstract login(user: UserModel): Observable<UserModel>;

    abstract userRegister(user: UserModel): Observable<any>;

}