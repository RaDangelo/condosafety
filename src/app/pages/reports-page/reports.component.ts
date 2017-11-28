import { Component } from '@angular/core';
import { WatchControlModel, AccessModel, PersonModel, VehicleModel, VisitorModel } from '../../models';
import { AccessServiceInterface, WatchControlServiceInterface } from '../../interfaces';

declare var $: any;

@Component({
  selector: 'reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.less']
})
export class ReportsComponent {

  option = 0;
  watchFilter: WatchControlModel = new WatchControlModel();
  accessFilter: AccessModel = new AccessModel();
  date: Date;
  username = '';
  requester = '';
  dataType = null;
  results: any[] = [];

  constructor(private accessService: AccessServiceInterface, private watchService: WatchControlServiceInterface) {
    $('body').css('background-color', '#c2c2c2');
  }

  getReport() {
    if (this.option == 0) {
      this.watchFilter.user.username = this.username;
      this.watchFilter.date = this.date;
      console.log(this.watchFilter);
      this.watchService.getList(this.watchFilter).subscribe((data) => {
        console.log(this.watchFilter);
        this.results = data;
      },
        (error) => {
          console.log('Erro ao buscar relatórios de acesso ao sistema!');
        });
    } else {
      this.accessFilter.user.username = this.username;
      this.accessFilter.date = this.date;
      this.getRequester();
      console.log(this.accessFilter);
      this.accessService.getList(this.accessFilter).subscribe((data) => {
        console.log(this.accessFilter);
        this.results = data;
      },
        (error) => {
          console.log('Erro ao buscar relatórios de acesso ao condomínio!');
        });
    }
  }

  private getRequester() {
    if (this.accessFilter.type) {
      if (this.accessFilter.type == 1) {
        if (this.dataType) {
          this.accessFilter.person = new PersonModel();
          if (this.dataType === 'Nome') {
            this.accessFilter.person.name = this.requester;
          } else {
            this.accessFilter.person.cpf = this.requester;
          }
        }
      } else if (this.accessFilter.type == 2) {
        if (this.dataType) {
          this.accessFilter.vehicle = new VehicleModel();
          if (this.dataType === 'Marca') {
            this.accessFilter.vehicle.brand = this.requester;
          } else {
            this.accessFilter.vehicle.plate = this.requester;
          }
        }
      } else {
        if (this.dataType) {
          this.accessFilter.visitor = new VisitorModel();
          if (this.dataType === 'Nome') {
            this.accessFilter.visitor.name = this.requester;
          } else {
            this.accessFilter.visitor.document = this.requester;
          }
        }
      }
    }
  }

  clearFilters() {
    this.watchFilter = new WatchControlModel();
    this.accessFilter = new AccessModel();
    this.username = '';
    this.date = null;
  }

  changeOption() {
    this.clearFilters();
    this.results = [];
  }
}
