import { Component } from '@angular/core';
import { PersonModel, MessagesModel, ApartmentModel, PersonTypeModel } from '../../models';
import { MessageDialogBehavior, ImageBehavior } from '../../behaviors';
import { ApartmentServiceInterface, PersonServiceInterface, PersonTypeServiceInterface } from '../../interfaces';

declare var $: any;

@Component({
  selector: 'people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.less']
})
export class PeopleComponent {

  disableFields = true;
  person: PersonModel;
  _persons: PersonModel[];
  _apartments: ApartmentModel[];
  _types: PersonTypeModel[];
  personImageUpload: any;

  get types() {
    if (this._types) {
      this._types.sort((a: PersonTypeModel, b: PersonTypeModel) => {
        return a.type > b.type ? 1 : -1;
      });
    }
    return this._types;
  }

  get persons() {
    if (this._persons) {
      this._persons.sort((a: PersonModel, b: PersonModel) => {
        return (a.status > b.status) ? 1 : (a.status < b.status) ? -1 : (a.name > b.name) ? 1 : -1;
      });
    }
    return this._persons;
  }

  get apartments() {
    if (this._apartments) {
      this._apartments.sort((a: ApartmentModel, b: ApartmentModel) => {
        return (a.complex > b.complex) ? 1 : (a.complex < b.complex) ? -1 : (a.number - b.number);
      });
    }
    return this._apartments;
  }

  constructor(private personService: PersonServiceInterface, private apartmentService: ApartmentServiceInterface,
    private typesService: PersonTypeServiceInterface, private dialogBehavior: MessageDialogBehavior, private imageBehavior: ImageBehavior) {
    this.person = new PersonModel();
    this.getApartments();
    this.getTypes();
    this.getPersons();
  }

  changePersonStatus() {
    this.person.status = !this.person.status;
  }

  newPerson() {
    this.person = new PersonModel();
    this.disableFields = false;
  }


  private getPersons() {
    this.personService.getList()
      .subscribe((data) => {
        this._persons = data;
        this.person = new PersonModel();
        this.disableFields = true;
      },
      (error: MessagesModel) => {
        console.log('Ocorreu um erro: ' + error.message);
      },
      () => {
        console.log('Pessoas obtidas com sucesso! ');
      });
  }


  private getApartments() {
    this.apartmentService.getList()
      .subscribe((data) => {
        this._apartments = data;
      },
      (error: MessagesModel) => {
        console.log('Ocorreu um erro: ' + error.message);
      },
      () => {
        console.log('Apartamentos obtidos com sucesso! ');
      });
  }

  private getTypes() {
    this.typesService.getList()
      .subscribe((data) => {
        this._types = data;
      },
      (error: MessagesModel) => {
        console.log('Ocorreu um erro: ' + error.message);
      },
      () => {
        console.log('Tipos de pessoa obtidos com sucesso! ');
      });
  }

  editPerson(p: PersonModel, i: number) {
    this.person = p;
    this.disableFields = false;
  }

  deletePerson() {
    this.person.picture = null;
    this.personService.delete(this.person)
      .subscribe(() => { },
      (error: MessagesModel) => {
        console.log('Ocorreu um erro: ' + error.message);
        error.severity = MessagesModel.SEVERITIES.ERROR;
        this.dialogBehavior.showErrorMessage(error);
      },
      () => {
        this.getPersons();
        console.log('Pessoa excluída com sucesso! ');
        alert('Pessoa excluída com sucesso! ');
      });
  }

  savePerson() {
    this.person.picture = null;
    this.personService.save(this.person)
      .subscribe((id) => {
        this.personImageUpload = { execute: true, id: id };
      },
      (error: MessagesModel) => {
        console.log('Ocorreu um erro: ' + error.message);
        error.severity = MessagesModel.SEVERITIES.ERROR;
        this.dialogBehavior.showErrorMessage(error);
      },
      () => {
        this.getPersons();
        if (this.person._id) {
          console.log('Pessoa alterada com sucesso! ');
          alert('Pessoa alterada com sucesso! ');
        } else {
          console.log('Pessoa cadastrada com sucesso! ');
          alert('Pessoa cadastrada com sucesso! ');
        }
      });
  }

  registerPersonType() {
    $('#person-type-modal').modal('show');
  }

  uploadFinished() {
    this.personImageUpload = { execute: false, id: '' };
    this.getPersons();
  }

  openImage() {
    this.imageBehavior.openModal$.next(this.person.picture);
  }

}
