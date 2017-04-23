import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';

import {PessoaModel} from '../models';

@Injectable()
export abstract class PessoaServiceInterface {

    abstract save(pessoa: PessoaModel): Observable<any>;

    abstract getList(): Observable<Array<PessoaModel>>;

    abstract getSingle (pessoa: PessoaModel): Observable<PessoaModel>;    

    abstract update(pessoa: PessoaModel): Observable<any>;

    abstract delete(pessoa: PessoaModel): Observable<any>;
    
}