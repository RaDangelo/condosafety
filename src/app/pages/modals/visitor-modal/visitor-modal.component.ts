import { Component, Input } from '@angular/core';
import { VisitorModel, MessagesModel } from '../../../models';
import { VisitorServiceInterface } from '../../../interfaces';
import { MessageDialogBehavior, ImageBehavior } from '../../../behaviors';

declare var $: any;

@Component({
    selector: 'visitor-modal',
    templateUrl: './visitor-modal.component.html',
    styleUrls: ['./visitor-modal.component.less']
})
export class VisitorComponent {

    disableFields = true;
    visitor: VisitorModel;
    _visitors: VisitorModel[];
    visitorImageUpload: any;

    get visitors() {
        if (this._visitors) {
            this._visitors.sort((a: VisitorModel, b: VisitorModel) => {
                return (a.name > b.name) ? 1 : -1;
            });
        }
        return this._visitors;
    }

    constructor(private visitorService: VisitorServiceInterface, private dialogBehavior: MessageDialogBehavior,
        private imageBehavior: ImageBehavior) {
        this.visitor = new VisitorModel();
        // this.getVisitors();
    }

    newVisitor() {
        this.visitor = new VisitorModel();
        this.disableFields = false;
    }


    // private getVisitors() {
    //     this.visitorService.getList()
    //         .subscribe((data) => {
    //             this._visitors = data;
    //             this.visitor = new VisitorModel();
    //             this.disableFields = true;
    //         },
    //         (error: MessagesModel) => {
    //             console.log('Ocorreu um erro: ' + error.message);
    //         },
    //         () => {
    //             console.log('Visitantes obtidos com sucesso! ');
    //         });
    // }


    // editVisitor(p: VisitorModel, i: number) {
    //     this.visitor = p;
    //     this.disableFields = false;
    // }

    saveVisitor() {
        this.visitor.picture = null;
        this.visitorService.save(this.visitor)
            .subscribe((id) => {
                this.visitorImageUpload = { execute: true, id: id };
            },
            (error: MessagesModel) => {
                console.log('Ocorreu um erro: ' + error.message);
                error.severity = MessagesModel.SEVERITIES.ERROR;
                this.dialogBehavior.showErrorMessage(error);
            },
            () => {
                // this.getVisitors();
                // if (this.visitor._id) {
                //     console.log('Visitante alterado com sucesso! ');
                //     alert('Visitante alterado com sucesso! ');
                // } else {
                console.log('Visitante cadastrado com sucesso! ');
                alert('Visitante cadastrado com sucesso! ');
                // }
            });
    }

    uploadFinished() {
        this.visitorImageUpload = { execute: false, id: '' };
        // this.getVisitors();
    }

    openImage() {
        this.imageBehavior.openModal$.next(this.visitor.picture);
    }

    closeModal() {
        $('#visitor-modal').modal('hide');
    }
}
