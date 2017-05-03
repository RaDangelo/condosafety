import { LoginServiceInterface } from '../interfaces';
import { userInfo } from 'os';
import { Component } from '@angular/core';
import { UserModel } from '../models';

declare var $: any;

@Component({
  selector: 'login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.less']
})
export class LoginPageComponent {

  user: UserModel;

  constructor(private loginService: LoginServiceInterface) {
    $('body').css('background-color', 'transparent');
    this.user = new UserModel();
  }

  login() {
    this.loginService.login(this.user)
      .subscribe((data: UserModel) =>
        console.log('Usuario retornado: ' + data),
      (error) => {
        console.log('Ocorreu um erro: ' + error);
      },
      () => {
        console.log('Login executado com sucesso! Usuário logado: ');
      });
  }
}
