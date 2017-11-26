import { MessageDialogBehavior } from '../../behaviors';
import * as path from 'path';
import { Stream } from 'stream';
import { Component, ViewChild, ElementRef, ViewChildren, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import {
  PersonModel, UserModel, VisitorModel, VehicleModel, MessagesModel, VideoInputModel,
  AccessModel, AccessType, AccessAction, ApartmentModel
} from '../../models';
import { PersonServiceInterface, AccessServiceInterface } from '../../interfaces';
import { ElectronService } from 'ngx-electron';
import { ConfigService } from '../../config.service';
import * as resemble from '../../utils/resemblejs/resemble';
import { ImageManipulation } from '../../utils/image-manipulation';
import * as dat from 'dat-gui';
import * as globals from '../../globals';

declare var $: any;
declare var document: any;
declare var tracking: any;

@Component({
  selector: 'monitoring',
  templateUrl: './monitoring.component.html',
  styleUrls: ['./monitoring.component.less']
})
export class MonitoringComponent implements AfterViewInit {
  filterResult: Array<Object> = new Array<Object>();;
  filter = '';
  selected: any;

  access: AccessModel = new AccessModel();
  accessPassword: string;
  user: UserModel = new UserModel();

  videos: Array<ElementRef> = new Array<ElementRef>();
  videoInputs: Array<VideoInputModel> = new Array<VideoInputModel>();
  selectedVideos: Array<VideoInputModel> = new Array<VideoInputModel>();
  frontCamera: any;
  displayFrontCamera = false;
  displayComparison = false;
  pictureTimer = 10;
  picture: any;

  @ViewChild('video0') video0: ElementRef;
  @ViewChild('video1') video1: ElementRef;
  @ViewChild('video2') video2: ElementRef;
  @ViewChild('video3') video3: ElementRef;

  constructor(private accessService: AccessServiceInterface, private dialogBehavior: MessageDialogBehavior,
    private electron: ElectronService, private config: ConfigService) {
    if (this.config.isElectron) {
      this.electron.remote.BrowserWindow.getFocusedWindow().setFullScreen(true);
    }
  }

  ngAfterViewInit() {
    this.lookForDevices();
    this.getFrontCamera();
  }

  private getFrontCamera() {
    this.frontCamera = document.getElementById('frontCamera');
    this.setFrontCamera();
  }

  private setFrontCamera() {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        this.frontCamera.src = window.URL.createObjectURL(stream);
        this.frontCamera.play();
      });
  }

  private lookForDevices() {
    this.videos = [this.video0, this.video1, this.video2, this.video3];
    navigator.mediaDevices.enumerateDevices()
      .then(this.getDevices.bind(this))
  }

  private getDevices(infos) {
    console.log(infos);
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

  private takePicture() {
    return ImageManipulation.drawCameraImage(this.frontCamera, true);
  }

  private getImageFromPicture(context: any) {
    return ImageManipulation.fromImageToFile(ImageManipulation.fromCanvasToImage(context), 'image-to-compare.png');
  }

  private compareImages(picture: any): Observable<any> {
    return new Observable<any>(
      (observer: any) => {
        resemble(picture).compareTo(this.selected.picture).scaleToSameSize().dynamicIgnore()
          .onComplete((data) => {
            console.log('comparison', data);
            observer.next(data);
            observer.complete();
          });
      });
  }

  // ???????? mexer
  selectedItem(data: any, i: number) {
    this.selected = data;
    if (!this.selected.apartment) {
      this.selected.apartment = new ApartmentModel();
    }
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

  setAccess(action: number) {
    if (this.selected) {
      this.user.password = this.accessPassword;
      this.user.username = localStorage.getItem('username');
      this.accessService.validatePassword(this.user)
        .subscribe((data) => {
          this.accessPassword = '';
          if (data) {
            this.access.action = action;
            this.getAccess();
            if (action === AccessAction.ALLOW) {
              if (this.access.type === AccessType.PERSON) {
                this.recognizePerson();
              } else {
                this.allowAccess();
              }
            } else {
              if (this.access.observation) {
                this.denyAccess();
              } else {
                console.log('Insira um motivo!');
                const error = new MessagesModel();
                error.severity = MessagesModel.SEVERITIES.ERROR;
                this.dialogBehavior.showErrorMessage(error);
              }
            }
          } else {
            console.log('Senha incorreta');
            const error = new MessagesModel();
            error.severity = MessagesModel.SEVERITIES.ERROR;
            this.dialogBehavior.showErrorMessage(error);
            this.access = new AccessModel();
          }
        },
        (error: MessagesModel) => {
          console.log('Ocorreu um erro: ' + error.message);
          error.severity = MessagesModel.SEVERITIES.ERROR;
          this.dialogBehavior.showErrorMessage(error);
          this.access = new AccessModel();
        });
    } else {
      const error = new MessagesModel();
      error.severity = MessagesModel.SEVERITIES.WARNING;
      error.message = 'Busque e selecione uma pessoa ou veículo!';
      this.dialogBehavior.showErrorMessage(error);
    }
  }

  private recognizePerson() {
    this.displayFrontCamera = true;

    this.startTimer(10);

    setTimeout(this.callTracker, 1000);

    setTimeout(() => {
      this.picture = this.getImageFromPicture(this.takePicture());
      this.displayFrontCamera = false;
      // this.beginComparison();

      // show 2 divs side by side on html

      // set 2 divs opacity 

      this.compareImages(this.picture).subscribe((data) => {
        if (data.misMatchPercentage > 20) {
          this.denyAccess();
        } else {
          this.allowAccess();
        }
      });
    }, 10000);
  }

  private beginComparison() {
    this.displayComparison = true;
    // set side by side
    $('#imageTwo').css('opacity', '0.5');

  }

  private allowAccess() {
    this.access.action = AccessAction.ALLOW;
    this.callAccessService();
  }

  private denyAccess() {
    this.access.action = AccessAction.DENY;
    this.callAccessService();
  }

  private startTimer(timer: number) {
    this.pictureTimer = timer;
    if (timer > 0) {
      setTimeout(() => {
        this.startTimer(timer--);
      }, 1000);
    }
  }

  callAccessService() {
    this.accessService.insertAccess(this.access).finally(() => this.access = new AccessModel())
      .subscribe((data) => {
        console.log(data);
        this.access.action === AccessAction.ALLOW ? alert('Entrada permitida! ') : alert('Entrada negada! ');
      },
      (error: MessagesModel) => {
        console.log('Ocorreu um erro: ' + error.message);
        error.severity = MessagesModel.SEVERITIES.ERROR;
        this.dialogBehavior.showErrorMessage(error);
      });
  }

  private getAccess() {
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
    } else {
      this.access.visitor = new VisitorModel(this.selected);
      this.access.visitor.picture = null;
      this.access.type = AccessType.VISITOR;
    }

    if (this.selected.apartment) {
      this.access.apartment = this.selected.apartment;
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

  private callTracker() {
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');

    const tracker = new tracking.ObjectTracker('face');
    tracker.setInitialScale(4);
    tracker.setStepSize(2);
    tracker.setEdgesDensity(0.1);


    tracking.track('#frontCamera', tracker, { camera: true });
    tracker.on('track', function (event) {
      context.clearRect(0, 0, canvas.width, canvas.height);
      event.data.forEach(function (rect) {
        context.strokeStyle = '#a64ceb';
        context.strokeRect(rect.x, rect.y, rect.width, rect.height);
        context.font = '11px Helvetica';
        context.fillStyle = '#fff';
        context.fillText('x: ' + rect.x + 'px', rect.x + rect.width + 5, rect.y + 11);
        context.fillText('y: ' + rect.y + 'px', rect.x + rect.width + 5, rect.y + 22);
        globals.GlobalVars.imgX = rect.x;
        globals.GlobalVars.imgY = rect.y;
        globals.GlobalVars.imgWidth = rect.width;
        globals.GlobalVars.imgHeight = rect.height;

      });
    });
    // const gui = new dat.GUI();
    // gui.add(tracker, 'edgesDensity', 0.1, 0.5).step(0.01);
    // gui.add(tracker, 'initialScale', 1.0, 10.0).step(0.1);
    // gui.add(tracker, 'stepSize', 1, 5).step(0.1);
  };
}
