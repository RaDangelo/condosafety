import { PersonTypeServiceInterface } from '../../../interfaces';
import { PersonTypeModel, MessagesModel } from '../../../models';
import { Component, Input, EventEmitter, Output } from '@angular/core';
import { MessageDialogBehavior } from '../../../behaviors';

declare var $: any;

@Component({
  selector: 'person-type-modal',
  templateUrl: './person-type-modal.component.html',
  styleUrls: ['./person-type-modal.component.less']
})
export class PersonTypeModalComponent {

  _types: PersonTypeModel[];
  type: PersonTypeModel;

  @Output() getTypes = new EventEmitter();

  @Input() set types(t: PersonTypeModel[]) {
    if (t) {
      this._types = t;
    }
  }

  get types() {
    if (this._types) {
      this._types.sort((a: PersonTypeModel, b: PersonTypeModel) => {
        return a.type > b.type ? 1 : -1;
      });
    }
    return this._types;
  }

  constructor(private typeService: PersonTypeServiceInterface, private dialogBehavior: MessageDialogBehavior) {
    this.type = new PersonTypeModel();
  }

  // private getTypes() {
  //   this.typeService.getList()
  //     .subscribe((data) => {
  //       this._types = data;
  //       this.type = new PersonTypeModel();
  //     },
  //     (error: MessagesModel) => {
  //       console.log('Ocorreu um erro: ' + error.message);
  //     },
  //     () => {
  //       console.log('Tipos de pessoa obtidos com sucesso! ');
  //     });
  // }

  newPersonType() {
    this.typeService.save(this.type)
      .subscribe(() => { },
      (error: MessagesModel) => {
        console.log('Ocorreu um erro: ' + error.message);
        error.severity = MessagesModel.SEVERITIES.ERROR;
        this.dialogBehavior.showErrorMessage(error);
      },
      () => {
        this.getTypes.emit();
        console.log('Tipo de pessoa cadastrado com sucesso! ');
        alert('Tipo de pessoa cadastrado com sucesso! ');
      });
  }

  deleteType(type: PersonTypeModel) {
    this.typeService.delete(type)
      .subscribe(() => { },
      (error: MessagesModel) => {
        console.log('Ocorreu um erro: ' + error.message);
        error.severity = MessagesModel.SEVERITIES.ERROR;
        this.dialogBehavior.showErrorMessage(error);
      },
      () => {
        this.getTypes.emit();
        console.log('Tipo de pessoa excluído com sucesso! ');
        alert('Tipo de pessoa excluído com sucesso! ');
      });
  }

  closeModal() {
    $('#person-type-modal').modal('hide');
  }
}
