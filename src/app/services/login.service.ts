import { LoginServiceInterface } from '../interfaces';
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';
import { RESTService } from '../rest.service';
import { UserModel, WatchControlModel } from '../models';

@Injectable()
export class LoginService extends LoginServiceInterface {

    userUrl = '/user/';

    constructor(private restService: RESTService) {
        super();
    }

    login(user: UserModel): Observable<UserModel> {
        return this.restService.post(this.userUrl + 'login/', user)
            .map((res: Response) => <UserModel>res.json())
            .catch(RESTService.handleErrorMessage);
    }

    userRegister(user: UserModel): Observable<any> {
        return this.restService.post(this.userUrl, user)
            .map((res: Response) => <any>res.json())
            .catch(RESTService.handleErrorMessage);
    }

    getList(): Observable<UserModel[]> {
        return this.restService.get(this.userUrl)
            .map((res: Response) => <UserModel>res.json().map(u => new UserModel(u)))
            .catch(RESTService.handleErrorMessage);
    }

    userDelete(user: UserModel): Observable<any> {
        return this.restService.post(this.userUrl + 'delete', user)
            .map((res: Response) => <any>res.json())
            .catch(RESTService.handleErrorMessage);
    }

}