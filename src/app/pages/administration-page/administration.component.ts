import { LoginServiceInterface } from '../../interfaces';
import { Component } from '@angular/core';
import { UserModel, MessagesModel } from '../../models';
import { MessageDialogBehavior } from '../../behaviors';

declare var $: any;

@Component({
  selector: 'administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.less']
})
export class AdministrationComponent {

  user: UserModel;

  constructor(private userService: LoginServiceInterface, private dialogBehavior: MessageDialogBehavior) {
    this.user = new UserModel();
    // $('body').css('background-color', 'transparent');

  }

  saveUser() {
    this.userService.userRegister(this.user)
      .subscribe(() => { },
      (error: MessagesModel) => {
        console.log('Ocorreu um erro: ' + error.message);
        error.severity = MessagesModel.SEVERITIES.ERROR;
        this.dialogBehavior.showErrorMessage(error);
      },
      () => {
        console.log('Usuário cadastrado com sucesso! ');
        alert('Usuário cadastrado com sucesso! ');
      });
  }
}
