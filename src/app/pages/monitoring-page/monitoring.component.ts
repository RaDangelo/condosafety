import { MessageDialogBehavior } from '../../behaviors';
import * as path from 'path';
import { Stream } from 'stream';
import { Component, ViewChild, ElementRef, ViewChildren, AfterViewInit } from '@angular/core';

import {
  PersonModel, UserModel, VisitorModel, VehicleModel, MessagesModel, VideoInputModel,
  AccessModel, AccessType, AccessAction
} from '../../models';
import { PersonServiceInterface, AccessServiceInterface } from '../../interfaces';
import { ElectronService } from 'ngx-electron';

declare var $: any;
declare var document: any;

@Component({
  selector: 'monitoring',
  templateUrl: './monitoring.component.html',
  styleUrls: ['./monitoring.component.less']
})
export class MonitoringComponent implements AfterViewInit {

  filterResult: Array<Object>;
  videos: Array<ElementRef> = new Array<ElementRef>();
  selected: any;
  filter = '';
  access: AccessModel = new AccessModel();
  accessPassword: string;
  user: UserModel;
  videoInputs: Array<VideoInputModel> = new Array<VideoInputModel>();
  selectedVideos: Array<VideoInputModel> = new Array<VideoInputModel>();
  frontCamera: any;

  @ViewChild('video0') video0: ElementRef;
  @ViewChild('video1') video1: ElementRef;
  @ViewChild('video2') video2: ElementRef;
  @ViewChild('video3') video3: ElementRef;
  // @ViewChild('canvas') canvas: ElementRef;

  constructor(private accessService: AccessServiceInterface, private dialogBehavior: MessageDialogBehavior,
    private electron: ElectronService) {
    this.filterResult = new Array<Object>();
    this.user = new UserModel();
    this.electron.remote.BrowserWindow.getFocusedWindow().setFullScreen(true);
  }

  ngAfterViewInit() {
    this.videos = [this.video0, this.video1, this.video2, this.video3];
    navigator.mediaDevices.enumerateDevices()
      .then(this.getDevices.bind(this));
    // this.frontCamera = document.getElementById('frontCamera');
    // this.setPictureCamera();
  }

  private setPictureCamera() {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        this.frontCamera.src = window.URL.createObjectURL(stream);
        this.frontCamera.play();
      });
  }

  private takePicture() {
    let context;
    context = document.getElementById('canvas').getContext('2d');
    context.drawImage(this.frontCamera, 0, 0, 160, 200);
    this.convertCanvasToImage(context);
  }

  private convertCanvasToImage(context: any) {
    this.selected.picture = context.canvas.toDataURL('image/png');
  }

  private getDevices(infos) {
    for (const i of infos) {
      if (i.kind === 'videoinput') {
        const vid = new VideoInputModel();
        vid.id = i.deviceId;
        vid.name = i.label;
        this.videoInputs.push(vid);
      }
    }
  }

  showCamera(i: number) {
    const nv = this.videos[i].nativeElement;
    const media: MediaTrackConstraints = { deviceId: this.selectedVideos[i].id };
    navigator.mediaDevices.getUserMedia({ video: media })
      .then(stream => {
        nv.src = window.URL.createObjectURL(stream);
        nv.play();
      });
  }

  selectedItem(data: any, i: number) {
    this.selected = data;
  }

  filterData() {
    this.accessService.filterData(this.filter)
      .subscribe((data) => {
        this.filterResult = [...data];
      },
      (error: MessagesModel) => {
        console.log('Ocorreu um erro: ' + error.message);
      },
      () => {
        console.log('Dados filtrados com sucesso! ');
      });
  }

  showFrontCamera() {
    const nv = this.frontCamera.nativeElement;
    // const media: MediaTrackConstraints = { deviceId: id };
    // navigator.mediaDevices.getUserMedia()
    //   .then(stream => {
    //     nv.src = window.URL.createObjectURL(stream);
    //     nv.play();
    //   });
  }

  allowAccess() {
    if (this.selected) {
      this.user.password = this.accessPassword;
      this.user.username = localStorage.getItem('username');
      this.accessService.validatePassword(this.user)
        .subscribe((data) => {
          this.accessPassword = '';

          if (data) {
            // take picture
            // validate facial recognition

            this.getAccess();
            this.access.action = AccessAction.ALLOW;
            this.accessService.insertAccess(this.access)
              .subscribe((data) => {
                console.log(data);
                alert('Entrada permitida! ');
              },
              (error: MessagesModel) => {
                console.log('Ocorreu um erro: ' + error.message);
                error.severity = MessagesModel.SEVERITIES.ERROR;
                this.dialogBehavior.showErrorMessage(error);
              });

          } else {
            console.log('Senha incorreta');
            const error = new MessagesModel();
            error.severity = MessagesModel.SEVERITIES.ERROR;
            this.dialogBehavior.showErrorMessage(error);
          }
        },
        (error: MessagesModel) => {
          console.log('Ocorreu um erro: ' + error.message);
          error.severity = MessagesModel.SEVERITIES.ERROR;
          this.dialogBehavior.showErrorMessage(error);
        });
    } else {
      const error = new MessagesModel();
      error.severity = MessagesModel.SEVERITIES.WARNING;
      error.message = 'Busque e selecione uma pessoa ou veículo!';
      this.dialogBehavior.showErrorMessage(error);
    }
  }

  denyAccess() {
    if (this.selected) {
      this.user.password = this.accessPassword;
      this.user.username = localStorage.getItem('username');
      this.accessService.validatePassword(this.user)
        .subscribe((data) => {
          this.accessPassword = '';
          if (data) {
            // take picture
            // validate facial recognition

            this.getAccess();
            this.access.action = AccessAction.DENY;
            this.accessService.insertAccess(this.access)
              .subscribe((data) => {
                console.log(data);
                alert('Entrada negada! ');
              },
              (error: MessagesModel) => {
                console.log('Ocorreu um erro: ' + error.message);
                error.severity = MessagesModel.SEVERITIES.ERROR;
                this.dialogBehavior.showErrorMessage(error);
              });
          } else {
            console.log('Senha incorreta');
            const error = new MessagesModel();
            error.severity = MessagesModel.SEVERITIES.ERROR;
            this.dialogBehavior.showErrorMessage(error);
          }
        },
        (error: MessagesModel) => {
          console.log('Ocorreu um erro: ' + error.message);
          error.severity = MessagesModel.SEVERITIES.ERROR;
          this.dialogBehavior.showErrorMessage(error);
        });
    } else {
      const error = new MessagesModel();
      error.severity = MessagesModel.SEVERITIES.WARNING;
      error.message = 'Busque e selecione uma pessoa ou veículo!';
      this.dialogBehavior.showErrorMessage(error);
    }
  }

  private getAccess() {
    // if (this.selected.personType) {
    // access.person = this.selected;
    // access.type = AccessType.PERSON;
    // } else if (this.selected.plate) {
    //   access.vehicle = this.selected;
    // access.type = AccessType.VEHICLE;
    // } else {
    //   access.visitor = this.selected;    
    // access.type = AccessType.VISITOR;
    // }
    this.access.date = new Date();
    this.access.user.username = localStorage.getItem('username');
    if (this.selected.cpf) {
      this.access.person = new PersonModel(this.selected);
      this.access.person.picture = null;
      this.access.type = AccessType.PERSON;
    } else if (this.selected.plate) {
      this.access.vehicle = new VehicleModel(this.selected);
      this.access.vehicle.picture = null;
      this.access.type = AccessType.VEHICLE;
    }
  }

  openVisitorModal() {
    $('#visitor-modal').modal('show');
  }

  onEnterPress(e: KeyboardEvent) {
    if (e.keyCode === 13) {
      this.filterData();
    }
  }

}
