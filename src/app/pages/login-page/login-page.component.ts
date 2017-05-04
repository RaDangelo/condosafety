import { Router } from '@angular/router';
import { LoginServiceInterface } from '../../interfaces';
import { userInfo } from 'os';
import { Component } from '@angular/core';
import { UserModel } from '../../models';

declare var $: any;

@Component({
  selector: 'login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.less']
})
export class LoginPageComponent {

  user: UserModel;
  alertPassword: boolean;
  alertUsername: boolean;

  constructor(private loginService: LoginServiceInterface, private route: Router) {
    $('body').css('background-color', 'transparent');
    this.user = new UserModel();
    this.alertPassword = false;
    this.alertUsername = false;
  }

  login() {
    if (this.validateLogin()) {

      this.alertPassword = false;
      this.alertUsername = false;

      this.loginService.login(this.user)
        .subscribe((data: UserModel) => {
          console.log('Usuario retornado: ' + data),
            localStorage.setItem('username', JSON.stringify(this.user.username));
        },
        (error) => {
          console.log('Ocorreu um erro: ' + error);
          this.route.navigate(['/admin']);
          
        },
        () => {
          console.log('Login executado com sucesso! Usuário logado: ');
          this.route.navigate(['/admin']);
        });
    }
  }

  private validateLogin() {
    if (!this.user.username || !this.user.password) {
      if (!this.user.username) {
        this.alertUsername = true;
      }
      if (!this.user.password) {
        this.alertPassword = true;
      }
      return false;
    }

    return true;
  }
}
