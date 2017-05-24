import { LoginServiceInterface, ApartmentServiceInterface, VehicleServiceInterface } from '../../interfaces';
import { Component } from '@angular/core';
import { UserModel, MessagesModel, ApartmentModel, VehicleModel } from '../../models';
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
  apartment: ApartmentModel;
  apartments: ApartmentModel[];
  selectedVehicle: VehicleModel;
  vehicle: VehicleModel;
  vehicles: VehicleModel[];
  warning: MessagesModel = new MessagesModel();
  disableUserFields = true;
  disableAptFields = true;
  disableVehicleFields = true;

  constructor(private userService: LoginServiceInterface, private apartmentService: ApartmentServiceInterface,
    private vehicleService: VehicleServiceInterface,
    private dialogBehavior: MessageDialogBehavior) {
    this.user = new UserModel();
    this.vehicle = new VehicleModel();
    this.apartment = new ApartmentModel();
    this.selectedVehicle = null;
    this.getUsers();
    this.getApartments();
    this.getVehicles();

    // $('body').css('background-color', 'transparent');

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
        this.apartments = data;
        this.selectedVehicle = null;
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
        this.apartment = new ApartmentModel();
        this.disableAptFields = true;
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
        this.vehicles = data;
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
        this.vehicle = new VehicleModel();
        this.disableVehicleFields = true;
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
        this.user = new UserModel();
        this.disableUserFields = true;
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
