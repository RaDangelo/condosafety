import { PessoaServiceInterface } from '../interfaces';
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';
import { RESTService } from '../rest.service';
import { PessoaModel } from '../models';

@Injectable()
export class PessoaService extends PessoaServiceInterface {

    url = '/pessoa/';

    constructor(private restService: RESTService) {
        super();
    }

    getList(): Observable<Array<PessoaModel>> {
        return this.restService.get(this.url)
            .map((res: Response) => <PessoaModel[]>res.json().map(p => new PessoaModel(p)))
            .catch(RESTService.handleErrorMessage);
    }

    getSingle(pessoa: PessoaModel): Observable<PessoaModel> {
        return this.restService.get(this.url)
            .map((res: Response) => <PessoaModel>res.json())
            .catch(RESTService.handleErrorMessage);
    }

    save(pessoa: PessoaModel): Observable<any> {
        return this.restService.post(this.url, pessoa)
            .map((res: Response) => <any>res.json())
            .catch(RESTService.handleErrorMessage);
    }

    update(pessoa: PessoaModel): Observable<any> {
        return this.restService.post(this.url, pessoa)
            .map((res: Response) => <any>res.json())
            .catch(RESTService.handleErrorMessage);
    }

    delete(pessoa: PessoaModel): Observable<any> {
        return this.restService.delete(this.url + pessoa.id)
            .map((res: Response) => <any>res.json())
            .catch(RESTService.handleErrorMessage);
    }

}