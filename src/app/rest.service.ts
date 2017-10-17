import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers, BaseRequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { ConfigService } from './config.service';
import { Router } from '@angular/router';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class RESTService extends BaseRequestOptions {

    protected baseUrl: string;

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

    get(url: string, options?: RequestOptions): Observable<Response> {
        let serviceUrl = this.baseUrl + url;
        if (this.configService.showServiceUrl) {
            console.log('[GET] - Service Url: ' + serviceUrl);
            console.log(JSON.stringify(options));
        }
        return this.http.get(serviceUrl, options).timeout(10000, new Error('TimeOut!'));
    }

    post(url: string, body: any, options?: RequestOptions): Observable<Response> {
        let serviceUrl = this.baseUrl + url;
        if (this.configService.showServiceUrl) {
            console.log('[POST] - Service Url: ' + serviceUrl);
            console.log(JSON.stringify(options));
        }
        return this.http.post(serviceUrl, body, options).timeout(10000, new Error('TimeOut!'));
    };

    put(url: string, body: any, options?: RequestOptions): Observable<Response> {
        let serviceUrl = this.baseUrl + url;
        if (this.configService.showServiceUrl) {
            console.log('[PUT] - Service Url: ' + serviceUrl);
            console.log(JSON.stringify(options));
        }
        return this.http.put(serviceUrl, body, options).timeout(10000, new Error('TimeOut!'));

    }

    delete(url: string, options?: RequestOptions): Observable<Response> {
        let serviceUrl = this.baseUrl + url;
        if (this.configService.showServiceUrl) {
            console.log('[DELETE] - Service Url: ' + serviceUrl);
            console.log(JSON.stringify(options));
        }
        return this.http.delete(serviceUrl, options).timeout(10000, new Error('TimeOut!'));
    }

    getBaseUrl(): string {
        return this.baseUrl;
    }
}
