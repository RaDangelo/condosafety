import { LoginServiceInterface, ApartmentServiceInterface, VehicleServiceInterface, AFKTimeServiceInterface } from '../../interfaces';
import { Component } from '@angular/core';
import { AfkTimeModel, ApartmentModel, MessagesModel, UserModel, VehicleModel } from '../../models';
import { MessageDialogBehavior } from '../../behaviors';
import { FileUploader, FileItem, FileUploaderOptions } from 'ng2-file-upload';

declare var $: any;

@Component({
  selector: 'administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.less']
})
export class AdministrationComponent {

  uploader: FileUploader;

  user: UserModel;
  users: UserModel[];
  apartment: ApartmentModel;
  _apartments: ApartmentModel[];
  selectedVehicle: VehicleModel;
  vehicle: VehicleModel;
  _vehicles: VehicleModel[];
  afk: AfkTimeModel;
  warning: MessagesModel = new MessagesModel();
  disableUserFields = true;
  disableAptFields = true;
  disableVehicleFields = true;

  constructor(private userService: LoginServiceInterface, private apartmentService: ApartmentServiceInterface,
    private vehicleService: VehicleServiceInterface, private afkService: AFKTimeServiceInterface,
    private dialogBehavior: MessageDialogBehavior) {
    this.user = new UserModel();
    this.vehicle = new VehicleModel();
    this.apartment = new ApartmentModel();
    this.afk = new AfkTimeModel();
    this.selectedVehicle = null;
    this.getUsers();
    this.getApartments();
    this.getVehicles();
    this.getAfkTime();

    this.setUploader();

    // $('body').css('background-color', 'transparent');

  }

  upload() {
    if (this.uploader.queue.length > 0) {
      this.uploader.queue[this.uploader.queue.length - 1].upload();
    }
  }

  resetQueue() {
    if (this.uploader.queue.length > 0) {
      this.uploader.queue = new Array<FileItem>();
    }
  }

  private setUploader() {
    let fileUploaderOptions: FileUploaderOptions = { url: this.vehicleService.getUploadEndpoint(), disableMultipart: false, queueLimit: 1 };
    this.uploader = new FileUploader(fileUploaderOptions);
    this.uploader.onCompleteItem = ((item: any, response: any, status: any, headers: any): any => {

    });
  }

  get apartments() {
    if (this._apartments) {
      this._apartments.sort((a: ApartmentModel, b: ApartmentModel) => {
        return (a.complex > b.complex) ? 1 : (a.complex < b.complex) ? -1 : (a.number - b.number);
      });
    }
    return this._apartments;
  }

  get vehicles() {
    if (this._vehicles) {
      this._vehicles.sort((a: VehicleModel, b: VehicleModel) => {
        return b.status > a.status ? 1 : -1;
      });
    }
    return this._vehicles;
  }

  changeVehicleStatus() {
    this.vehicle.status = !this.vehicle.status;
  }

  changeAptStatus() {
    this.apartment.status = !this.apartment.status;
  }

  setApartmentVehicle() {
    if (this.apartment.vehicles.length > 2) {
      this.warning.severity = MessagesModel.SEVERITIES.WARNING;
      this.warning.message = 'Número máximo de veículos inserido!';
      this.dialogBehavior.showErrorMessage(this.warning);
    }
    if (this.selectedVehicle) {
      for (let v of this.apartment.vehicles) {
        if (v === this.selectedVehicle) {
          this.warning.severity = MessagesModel.SEVERITIES.WARNING;
          this.warning.message = 'Veículo já inserido!';
          this.dialogBehavior.showErrorMessage(this.warning);
          return false;
        }
      }
      this.apartment.vehicles.push(this.selectedVehicle);
    }
  }

  eraseAptVehicle(vehic: VehicleModel) {
    this.apartment.vehicles.splice(this.apartment.vehicles.indexOf(vehic));
  }

  private getApartments() {
    this.apartmentService.getList()
      .subscribe((data) => {
        this._apartments = data;
        this.selectedVehicle = null;
        this.apartment = new ApartmentModel();
        this.disableAptFields = true;
      },
      (error: MessagesModel) => {
        console.log('Ocorreu um erro: ' + error.message);
      },
      () => {
        console.log('Apartamentos obtidos com sucesso! ');
      });
  }

  newApartment() {
    this.apartment = new ApartmentModel();
    this.disableAptFields = false;
  }

  editApartment(apt: ApartmentModel, i: number) {
    this.apartment = apt;
    this.disableAptFields = false;
  }

  deleteApartment() {
    this.apartmentService.delete(this.apartment)
      .subscribe(() => { },
      (error: MessagesModel) => {
        console.log('Ocorreu um erro: ' + error.message);
        error.severity = MessagesModel.SEVERITIES.ERROR;
        this.dialogBehavior.showErrorMessage(error);
      },
      () => {
        this.getApartments();
        console.log('Apartamento excluído com sucesso! ');
        alert('Apartamento excluído com sucesso! ');
      });
  }

  saveApartment() {
    this.apartmentService.save(this.apartment)
      .subscribe(() => { },
      (error: MessagesModel) => {
        console.log('Ocorreu um erro: ' + error.message);
        error.severity = MessagesModel.SEVERITIES.ERROR;
        this.dialogBehavior.showErrorMessage(error);
      },
      () => {
        this.getApartments();
        if (this.apartment._id) {
          console.log('Apartamento alterado com sucesso! ');
          alert('Apartamento alterado com sucesso! ');
        } else {
          console.log('Apartamento cadastrado com sucesso! ');
          alert('Apartamento cadastrado com sucesso! ');
        }
      });
  }

  private getVehicles() {
    this.vehicleService.getList()
      .subscribe((data) => {
        this._vehicles = data;
        this.vehicle = new VehicleModel();
        this.disableVehicleFields = true;
      },
      (error: MessagesModel) => {
        console.log('Ocorreu um erro: ' + error.message);
      },
      () => {
        console.log('Veículos obtidos com sucesso! ');
      });
  }

  newVehicle() {
    this.vehicle = new VehicleModel();
    this.disableVehicleFields = false;
  }

  editVehicle(v: VehicleModel, i: number) {
    this.vehicle = v;
    this.disableVehicleFields = false;
  }

  deleteVehicle() {
    this.vehicleService.delete(this.vehicle)
      .subscribe(() => { },
      (error: MessagesModel) => {
        console.log('Ocorreu um erro: ' + error.message);
        error.severity = MessagesModel.SEVERITIES.ERROR;
        this.dialogBehavior.showErrorMessage(error);
      },
      () => {
        this.getVehicles();
        console.log('Veículo excluído com sucesso! ');
        alert('Veículo excluído com sucesso! ');
      });
  }

  saveVehicle() {
    this.vehicleService.save(this.vehicle)
      .subscribe(() => { },
      (error: MessagesModel) => {
        console.log('Ocorreu um erro: ' + error.message);
        error.severity = MessagesModel.SEVERITIES.ERROR;
        this.dialogBehavior.showErrorMessage(error);
      },
      () => {
        this.getVehicles();
        if (this.vehicle._id) {
          console.log('Veículo alterado com sucesso! ');
          alert('Veículo alterado com sucesso! ');
        } else {
          console.log('Veículo cadastrado com sucesso! ');
          alert('Veículo cadastrado com sucesso! ');
        }
      });
  }


  private getUsers() {
    this.userService.getList()
      .subscribe((data) => {
        this.users = data;
        this.user = new UserModel();
        this.disableUserFields = true;
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
    this.disableUserFields = false;
  }

  editUser(us: UserModel, i: number) {
    this.user = us;
    this.disableUserFields = false;
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

  private getAfkTime() {
    this.afkService.get()
      .subscribe((data) => {
        if (data) {
          this.afk = new AfkTimeModel(data);
        }
      },
      (error: MessagesModel) => {
        console.log('Ocorreu um erro: ' + error.message);
      },
      () => {
        console.log('Tempo de ociosidade obtido com sucesso! ');
      });
  }

  saveAfk() {
    this.afkService.save(this.afk)
      .subscribe(() => { },
      (error: MessagesModel) => {
        console.log('Ocorreu um erro: ' + error.message);
        error.severity = MessagesModel.SEVERITIES.ERROR;
        this.dialogBehavior.showErrorMessage(error);
      },
      () => {
        this.getAfkTime();
        if (this.afk._id) {
          console.log('Tempo de ociosidade permitido alterado com sucesso! ');
          alert('Tempo de ociosidade permitido alterado com sucesso! ');
        } else {
          console.log('Tempo de ociosidade permitido cadastrado com sucesso! ');
          alert('Tempo de ociosidade permitido cadastrado com sucesso! ');
        }
      });
  }
}
