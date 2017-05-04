import { Component } from '@angular/core';

import { PessoaModel } from '../../models';
import { PessoaServiceInterface } from '../../interfaces';

@Component({
  selector: 'monitoring',
  templateUrl: './monitoring.component.html',
  styleUrls: ['./monitoring.component.less']
})
export class MonitoringComponent {

  pessoa: PessoaModel;
  mensagemRetorno: string;

  constructor(private pessoaService: PessoaServiceInterface) {
    this.pessoa = new PessoaModel();
  }

  savePessoa() {
    this.pessoaService.save(this.pessoa)
      .subscribe((data: string) =>
        this.mensagemRetorno = data,
      (error) => {
        console.log('Ocorreu um erro!');
        alert(error);
      },
      () => {
        console.log('Pessoa salva com sucesso!');
        alert(this.mensagemRetorno);
      });
  }


}
