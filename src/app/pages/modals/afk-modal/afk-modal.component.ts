import { WatchControlServiceInterface } from '../../../interfaces';
import { UserModel, WatchControlModel, Action } from '../../../models';
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

  @Input() set startWarningTimer(start: boolean) {
    if (start) {
      this.warningStart = new Date();
    } else {
      this.warningStart = null;
    }
  }

  constructor(private watchService: WatchControlServiceInterface, private dialogBehavior: MessageDialogBehavior) {
    this.watch = new WatchControlModel();
    this.watch.action = Action.AFK;
    this.watch.user.username = localStorage.getItem('username');
  }

  insertWatchControl() {
    this.watch.date = new Date();
    this.watch.duration = globalVars.GlobalVars.afkTimer + (this.watch.date.getTime() - this.warningStart.getTime());
    console.log('Alerta de ausência: ' + this.watch.duration);
    this.callService();
  }

  private callService() {
    this.watchService.save(this.watch).subscribe((data) => {
      // ok
      globalVars.GlobalVars.isWarningTimer = false;
    },
      (err) => {
        // err
        // if err.status = 401 (usuario errado)
      });
  }

  validateExceedingTime(): boolean {
    if (this.warningStart) {
      return (new Date().getTime() - this.warningStart.getTime()) > 180000;
    }
    return false;
  }
}
