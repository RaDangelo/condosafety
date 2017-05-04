import { LoginServiceInterface } from '../../interfaces';
import { Component } from '@angular/core';
import { UserModel } from '../../models';

@Component({
  selector: 'administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.less']
})
export class AdministrationComponent {

  user: UserModel;

  constructor(private userService: LoginServiceInterface) {
    this.user = new UserModel();
  }

  saveUser() {
    this.userService.userRegister(this.user)
      .subscribe(() => { },
      (error) => {
        console.log('Ocorreu um erro: ' + error);
        alert('Erro ao cadastrar usuário!');

      },
      () => {
        console.log('Usuário cadastrado com sucesso! ');
        alert('Usuário cadastrado com sucesso! ');
      });
  }
}
