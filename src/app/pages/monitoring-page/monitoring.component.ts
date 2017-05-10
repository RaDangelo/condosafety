import { Component } from '@angular/core';

import { PersonModel } from '../../models';
import { PersonServiceInterface } from '../../interfaces';

@Component({
  selector: 'monitoring',
  templateUrl: './monitoring.component.html',
  styleUrls: ['./monitoring.component.less']
})
export class MonitoringComponent {

  person: PersonModel;
  retorno: string;

  constructor(private personService: PersonServiceInterface) {
    this.person = new PersonModel();
  }

  savePessoa() {
    this.personService.save(this.person)
      .subscribe((data: string) =>
        this.retorno = data,
      (error) => {
        console.log('Ocorreu um erro!');
        alert(error);
      },
      () => {
        console.log('Pessoa salva com sucesso!');
        alert(this.retorno);
      });
  }


}
