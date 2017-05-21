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
  users: UserModel[];
  disableFields = true;

  constructor(private userService: LoginServiceInterface, private dialogBehavior: MessageDialogBehavior) {
    this.user = new UserModel();
    this.getUsers();
    // $('body').css('background-color', 'transparent');

  }


  private getUsers() {
    this.userService.getList()
      .subscribe((data) => {
        this.users = data;
        console.log(this.users);
      },
      (error: MessagesModel) => {
        console.log('Ocorreu um erro: ' + error.message);
      },
      () => {
        console.log('Usuário obtidos com sucesso! ');
      });
  }

  newUser() {
    this.user = new UserModel();
    this.disableFields = false;
  }

  editUser(us: UserModel, i: number) {
    this.user = us;
    this.disableFields = false;
  }

  deleteUser() {
    this.userService.userDelete(this.user)
      .subscribe(() => { },
      (error: MessagesModel) => {
        console.log('Ocorreu um erro: ' + error.message);
        error.severity = MessagesModel.SEVERITIES.ERROR;
        this.dialogBehavior.showErrorMessage(error);
      },
      () => {
        this.getUsers();
        console.log('Usuário excluído com sucesso! ');
        alert('Usuário excluído com sucesso! ');
      });
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
        this.getUsers();
        if (this.user._id) {
          console.log('Usuário alterado com sucesso! ');
          alert('Usuário alterado com sucesso! ');
        } else {
          console.log('Usuário cadastrado com sucesso! ');
          alert('Usuário cadastrado com sucesso! ');
        }
      });
  }
}
