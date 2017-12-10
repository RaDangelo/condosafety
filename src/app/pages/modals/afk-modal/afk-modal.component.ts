import { AFKTimeServiceInterface, AccessServiceInterface } from '../../../interfaces';
import { UserModel, WatchControlModel, Action, MessagesModel } from '../../../models';
import { Component, Input, EventEmitter, Output } from '@angular/core';
import { MessageDialogBehavior } from '../../../behaviors';
import * as globalVars from '../../../globals';

declare var $: any;

@Component({
  selector: 'afk-modal',
  templateUrl: './afk-modal.component.html',
  styleUrls: ['./afk-modal.component.less']
})
export class AfkModalComponent {

  watch: WatchControlModel;
  warningStart: Date = null;
  user: UserModel = new UserModel();

  @Input() set startWarningTimer(start: boolean) {
    if (start) {
      this.warningStart = new Date();
    } else {
      this.warningStart = null;
    }
  }

  constructor(private afkService: AFKTimeServiceInterface, private dialogBehavior: MessageDialogBehavior,
    private accessService: AccessServiceInterface) {
    this.watch = new WatchControlModel();
    this.watch.action = Action.AFK;
    this.watch.user.username = localStorage.getItem('username');
  }

  insertWatchControl() {
    this.watch.date = new Date();
    this.watch.duration = globalVars.GlobalVars.afkTimer + (this.watch.date.getMinutes() - this.warningStart.getMinutes());
    console.log('Alerta de ausência: ' + this.watch.duration);
    this.callService();
  }

  private callService() {
    if (!this.validateExceedingTime() || this.validateExceedingTime() && this.watch.obs) {
      this.accessService.validatePassword(this.watch.user)
        .subscribe((data) => {
          this.afkService.unfreeze(this.watch).subscribe(() => {
            globalVars.GlobalVars.isWarningTimer = false;
            this.watch = new WatchControlModel();
            $('#afk-modal').modal('hide');
          },
            (error: MessagesModel) => {
              console.log('Ocorreu um erro: ' + error.message);
              error.severity = MessagesModel.SEVERITIES.ERROR;
              this.dialogBehavior.showErrorMessage(error);
            });
        },
        (error: MessagesModel) => {
          console.log('Ocorreu um erro: ' + error.message);
          error.severity = MessagesModel.SEVERITIES.ERROR;
          this.dialogBehavior.showErrorMessage(error);
        });
    } else {
      console.log('Justificativa não inserida!');
      this.dialogBehavior.showErrorMessage(new MessagesModel('Insira uma justificativa!'));
    }
  }

  validateExceedingTime(): boolean {
    if (this.warningStart) {
      return (new Date().getTime() - this.warningStart.getTime()) > 180000;
    }
    return false;
  }

  getTimer() {
    return globalVars.GlobalVars.afkTimer;
  }
}
