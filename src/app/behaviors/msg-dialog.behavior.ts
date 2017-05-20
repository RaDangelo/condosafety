import { Injectable, EventEmitter } from '@angular/core';
import { MessagesModel } from '../models';
import { ElectronService } from 'ngx-electron';

@Injectable()
export class MessageDialogBehavior {

    constructor(private electron: ElectronService) {
    }

    showErrorMessage(msg: MessagesModel) {
        this.electron.remote.dialog.showMessageBox(null, { type: 'error', message: msg.message });
    }

    showToastMessage(msg: MessagesModel) {
        let toast = new MessagesModel();
        if (!msg.message) {
            toast.message = 'Ocorreu um erro inesperado!';
            toast.severity = MessagesModel.SEVERITIES.ERROR;
        } else {
            toast.message = msg.message;
        }
        this.showErrorMessage(toast);
    }
}