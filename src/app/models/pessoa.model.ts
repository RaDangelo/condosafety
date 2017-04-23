import {ApartamentoModel} from './';

export class PessoaModel {

    id: number;
    nome: string;
    apelido: string;
    tipo: string;
    apartamento: ApartamentoModel;

    constructor(pessoa: PessoaModel = null) {
        if (pessoa) {
            this.id = pessoa.id;
            this.apelido = pessoa.apelido;
            this.nome = pessoa.nome;
            this.tipo = pessoa.tipo;

            if (pessoa.apartamento) {
                this.apartamento = new ApartamentoModel(pessoa.apartamento);
            }
        }

        this.apartamento = this.apartamento || new ApartamentoModel();
    }



}