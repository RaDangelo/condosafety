import { MessageDialogBehavior, ImageBehavior } from '../../behaviors';
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
import * as globals from '../../globals';

declare var $: any;

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
  displayComparison = false;
  displayForceButton = false;
  displayMatchPercentage = false;
  forcedAccess = false;

  picture: any;
  photob64: string;
  photoParams = { autoStart: true, takePicture: false };

  comparisonClass = '';
  matchPercentage = 0;

  @ViewChild('video0') video0: ElementRef;
  @ViewChild('video1') video1: ElementRef;
  @ViewChild('video2') video2: ElementRef;
  @ViewChild('video3') video3: ElementRef;

  constructor(private accessService: AccessServiceInterface, private dialogBehavior: MessageDialogBehavior,
    private electron: ElectronService, private config: ConfigService, private imageBehavior: ImageBehavior) {
    $('body').css('background-color', '#c2c2c2');
    if (this.config.isElectron) {
      this.electron.remote.BrowserWindow.getFocusedWindow().setFullScreen(true);
    }
    this.imageBehavior.visitorImage$.subscribe(this.visitorImage.bind(this));
  }

  ngAfterViewInit() {
    this.lookForDevices();
  }

  private visitorImage(params: any) {
    this.photoParams = params;
    $('#photo-modal').modal('show');
  }

  private lookForDevices() {
    this.videos = [this.video0, this.video1, this.video2, this.video3];
    navigator.mediaDevices.enumerateDevices()
      .then(this.getDevices.bind(this));
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

  private afterPhotoTaken(pictures: any) {
    if (pictures.auto) {
      this.picture = pictures.picture;
      this.photob64 = pictures.b64;
      this.photoParams = { autoStart: true, takePicture: false };
      this.compareImages(this.picture).finally(() => {
        $('.flash').css('z-index', '-2');
        $('#photo-modal').modal('hide');
        this.beginComparison();
      }).subscribe((data) => {
        this.matchPercentage = 100 - parseInt(data.misMatchPercentage, 10);
        if (this.matchPercentage < 70) {
          this.comparisonClass = 'access-denied';
        } else {
          this.comparisonClass = 'access-allowed';
        }
      });
    } else {
      $('.flash').css('z-index', '-2');
      $('#photo-modal').modal('hide');
      this.imageBehavior.visitorImageResult$.emit(pictures);
    }
  }

  private recognizePerson() {
    this.photoParams = { autoStart: true, takePicture: true };
    $('#photo-modal').modal('show');
  }

  private beginComparison() {
    $('.left-container, .right-container').css('opacity', '0.4');
    this.displayComparison = true;
    this.beginAnimation();
  }

  private beginAnimation() {
    setTimeout(() => {
      $('.comparison-container > img').addClass('animate');
    }, 500);
    setTimeout(() => {
      this.mergeImages();
    }, 2000);
  }

  private mergeImages() {
    $('#imageOne').addClass('animate-opacity');
    setTimeout(() => {
      this.endAnimation();
    }, 3000);
  }

  private endAnimation() {
    $('.comparison-container > img').addClass(this.comparisonClass);
    $('.comparison-container > .match-percentage').addClass(this.comparisonClass);
    this.displayMatchPercentage = true;
    if (this.matchPercentage < 70) {
      this.displayForceButton = true;
    }
    setTimeout(() => {
      this.endComparison();
      this.forcedAccess = false;
    }, 8000);
  }

  private endComparison() {
    if (!this.forcedAccess) {
      if (this.matchPercentage < 75) {
        this.access.observation = 'Bloqueio de entrada automático por motivo de pessoa não conhecida! Semelhança = '
          + this.matchPercentage + '%';
        this.denyAccess();
      } else {
        this.access.observation = 'Entrada permitida através de reconhecimento facial! Semelhança = '
          + this.matchPercentage + '%';
        this.allowAccess();
      }
    }
    $('.comparison-container > img').removeClass(this.comparisonClass);
    $('.left-container, .right-container').css('opacity', '1');
    this.displayForceButton = false;
    this.displayComparison = false;
    this.displayMatchPercentage = false;
  }

  forceAccess(action: number) {
    this.forcedAccess = true;
    if (action === AccessAction.ALLOW) {
      this.access.observation = 'Permissão de entrada forçada por porteiro ' + this.access.user.username +
        ' após reconhecimento facial falho!';
      this.allowAccess();
    } else {
      this.access.observation = 'Bloqueio de entrada automático por motivo de pessoa não conhecida! Semelhança = '
        + this.matchPercentage + '%';
      this.denyAccess();
    }
    this.endComparison();
  }

  private allowAccess() {
    this.access.action = AccessAction.ALLOW;
    this.callAccessService();
  }

  private denyAccess() {
    this.access.action = AccessAction.DENY;
    this.callAccessService();
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

  isHighLevel() {
    if (localStorage.getItem('accessLevel') === '0') {
      return true;
    }
    return false;
  }
}
