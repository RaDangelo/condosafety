import { WatchControlServiceInterface } from '../../../interfaces';
import { UserModel, WatchControlModel } from '../../../models';
import { Component, Input, EventEmitter, Output } from '@angular/core';
import { MessageDialogBehavior } from '../../../behaviors';

declare var $: any;

@Component({
  selector: 'afk-modal',
  templateUrl: './afk-modal.component.html',
  styleUrls: ['./afk-modal.component.less']
})
export class AfkModalComponent {

  watch: WatchControlModel;

  constructor(private typeService: WatchControlServiceInterface, private dialogBehavior: MessageDialogBehavior) {
    this.watch = new WatchControlModel();
  }

  validateObservation() {
    // justificativa solicitada e inserida?
  }

  insertWatchControl() {

  }

  validateExceedingTime() {

  }
}
