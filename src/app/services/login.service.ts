import { LoginServiceInterface } from '../interfaces';
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';
import { RESTService } from '../rest.service';
import { UserModel } from '../models';

@Injectable()
export class LoginService extends LoginServiceInterface {

    url = '/login/';

    constructor(private restService: RESTService) {
        super();
    }

    login(user: UserModel): Observable<UserModel> {
        return this.restService.post(this.url, user)
            .map((res: Response) => <UserModel>res.json())
            .catch(RESTService.handleErrorMessage);
    }


}