import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers, BaseRequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { ConfigService } from './config.service';
import { Router } from '@angular/router';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class RESTService extends BaseRequestOptions {

    protected baseUrl: String;

    public static handleError(error: Response) {
        return Observable.throw(error.json().error || 'Server error');
    }

    public static handleErrorMessage(error: any) {
        if (error.status === 0) {
            return Observable.throw('Não foi possível estabelecer comunicação com o servidor.');
        }
        return Observable.throw(error.json() || 'Server error');
    }

    // constructor(protected http: Http, private configService: ConfigService, private route: Router) {
    constructor(protected http: Http, private configService: ConfigService) {        
        super();
        this.baseUrl = configService.apiUrl;
    }

    // public createAuthorizationHeader(opt?: RequestOptions) {
    //     let username = localStorage.getItem('username');
    //     if (username) {
    //         let headers = new Headers({ 'Authorization': username });
    //         let options = new RequestOptions({ headers: headers });

    //         return options;
    //     }
    //     // this.route.navigate(['/']);
    // }

    get(url: string, options?: RequestOptions): Observable<Response> {
        // options = this.createAuthorizationHeader(options);
        let serviceUrl = this.baseUrl + url;
        if (this.configService.showServiceUrl) {
            console.log('[GET] - Service Url: ' + serviceUrl);
            console.log(JSON.stringify(options));
        }
        return this.http.get(serviceUrl, options);
    }

    post(url: string, body: any, options?: RequestOptions): Observable<Response> {
        // options = this.createAuthorizationHeader(options);
        let serviceUrl = this.baseUrl + url;
        if (this.configService.showServiceUrl) {
            console.log('[POST] - Service Url: ' + serviceUrl);
            console.log(JSON.stringify(options));
        }
        return this.http.post(serviceUrl, body, options);
    };

    put(url: string, body: any, options?: RequestOptions): Observable<Response> {
        // options = this.createAuthorizationHeader(options);
        let serviceUrl = this.baseUrl + url;
        if (this.configService.showServiceUrl) {
            console.log('[PUT] - Service Url: ' + serviceUrl);
            console.log(JSON.stringify(options));
        }
        return this.http.put(serviceUrl, body, options);

    }

    delete(url: string, options?: RequestOptions): Observable<Response> {
        // options = this.createAuthorizationHeader(options);
        let serviceUrl = this.baseUrl + url;
        if (this.configService.showServiceUrl) {
            console.log('[DELETE] - Service Url: ' + serviceUrl);
            console.log(JSON.stringify(options));
        }
        return this.http.delete(serviceUrl, options);
    }

    getBaseUrl() {
        return this.baseUrl;
    }



}
