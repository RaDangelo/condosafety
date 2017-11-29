import { MessagesModel } from '../../models/messages.model';
import { Router } from '@angular/router';
import { LoginServiceInterface } from '../../interfaces';
import { userInfo } from 'os';
import { Component } from '@angular/core';
import { UserModel } from '../../models';
import { MessageDialogBehavior } from '../../behaviors';
import { ElectronService } from 'ngx-electron';
import { ConfigService } from '../../config.service';

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

  constructor(private loginService: LoginServiceInterface, private route: Router,
    private dialogBehavior: MessageDialogBehavior, private electron: ElectronService, private config: ConfigService) {
    $('body').css('background-color', 'transparent');
    this.user = new UserModel();
    this.alertPassword = false;
    this.alertUsername = false;
    if (this.config.isElectron) {
      this.electron.remote.BrowserWindow.getFocusedWindow().setFullScreen(false);
    }
  }

  login() {
    if (this.validateLogin()) {

      this.alertPassword = false;
      this.alertUsername = false;

      this.loginService.login(this.user)
        .subscribe((data: UserModel) => {
          console.log('Login executado com sucesso! Usuário logado: ' + data);
          localStorage.setItem('username', this.user.username);
          localStorage.setItem('accessLevel', data.accessLevel.toString());
        },
        (error: MessagesModel) => {
          console.log('Ocorreu um erro: ' + error.message);
          error.severity = MessagesModel.SEVERITIES.ERROR;
          this.dialogBehavior.showErrorMessage(error);
        },
        () => {
          $('body').css('width', '100%');
          this.route.navigate(['/monitoring']);
        });
    }
  }

  private validateLogin() {
    if (!this.user.username || !this.user.password) {
      if (!this.user.username) {
        this.alertUsername = true;
      } else {
        this.alertUsername = false;
      }
      if (!this.user.password) {
        this.alertPassword = true;
      } else {
        this.alertPassword = false;
      }
      return false;
    }

    return true;
  }

  onEnterPress(e: KeyboardEvent) {
    if (e.keyCode === 13) {
      this.login();
    }
  }
}
