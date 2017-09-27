import { MessageDialogBehavior } from '../../behaviors';
import * as path from 'path';
import { Stream } from 'stream';
import { Component, ViewChild, ElementRef, ViewChildren, QueryList, AfterViewInit } from '@angular/core';

import { PersonModel, UserModel, VisitorModel, MessagesModel, VideoInputModel } from '../../models';
import { PersonServiceInterface, AccessServiceInterface } from '../../interfaces';

@Component({
  selector: 'monitoring',
  templateUrl: './monitoring.component.html',
  styleUrls: ['./monitoring.component.less']
})
export class MonitoringComponent implements AfterViewInit {

  filterResult: Array<Object>;
  img: string;
  videos: Array<ElementRef>;
  selected: any;
  filter = '';
  accessPassword: string;
  user: UserModel;
  videoInputs: Array<VideoInputModel> = new Array<VideoInputModel>();
  selectedVideos: Array<VideoInputModel> = new Array<VideoInputModel>();
  // inputList: Array


  @ViewChild('video0') video0: ElementRef;
  @ViewChild('video1') video1: ElementRef;
  @ViewChild('video2') video2: ElementRef;
  @ViewChild('video3') video3: ElementRef;

  @ViewChildren('div1,div2,div3') divs: QueryList<ElementRef>;

  constructor(private accessService: AccessServiceInterface, private dialogBehavior: MessageDialogBehavior) {
    this.filterResult = new Array<Object>();
    this.videos = new Array<ElementRef>();
    this.user = new UserModel();
    this.img = '../../../../dist/assets/img-test.png';
  }

  ngAfterViewInit() {
    this.videos = [this.video0, this.video1, this.video2, this.video3];
    console.log('videos1', this.videos);

    navigator.mediaDevices.enumerateDevices()
      .then(this.getDevices.bind(this));

    console.log(navigator.mediaDevices.enumerateDevices());
  }

  private getDevices(infos) {
    for (const i of infos) {
      if (i.kind === 'videoinput') {
        if (i.deviceId !== 'db400b322ef9c2c2e774848fe24cc53697b478621b88946dfda758efd3b75604') {
          const vid = new VideoInputModel();
          vid.id = i.deviceId;
          vid.name = i.label;
          this.videoInputs.push(vid);
        }
      }
    }
  }

  showCamera(i: number) {
    console.log(this.selectedVideos);
    console.log('videos', this.videos);
    console.log('v', this.selectedVideos[i]);
    console.log('i', i);

    const nv = this.videos[i].nativeElement;
    const media: MediaTrackConstraints = { deviceId: this.selectedVideos[i].id };
    navigator.mediaDevices.getUserMedia({ video: media })
      .then(stream => {
        console.log(stream);
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

  allowAccess() {
    this.user.password = this.accessPassword;
    this.user.username = localStorage.getItem('username');
    this.accessService.validatePassword(this.user)
      .subscribe((data) => {
        if (data) {
          console.log(data);
          // pass accessmodel
        } else {
          console.log('Senha incorreta');
          let error = new MessagesModel();
          error.severity = MessagesModel.SEVERITIES.ERROR;
          this.dialogBehavior.showErrorMessage(error);
        }
      },
      (error: MessagesModel) => {
        console.log('Ocorreu um erro: ' + error.message);
        error.severity = MessagesModel.SEVERITIES.ERROR;
        this.dialogBehavior.showErrorMessage(error);
      });
  }

  denyAccess() {
    this.user.password = this.accessPassword;
    this.user.username = localStorage.getItem('username');
    this.accessService.validatePassword(this.user)
      .subscribe((data) => {
        if (data) {
          console.log(data);
          // pass accessmodel
        } else {
          console.log('Senha incorreta');
          let error = new MessagesModel();
          error.severity = MessagesModel.SEVERITIES.ERROR;
          this.dialogBehavior.showErrorMessage(error);
        }
      },
      (error: MessagesModel) => {
        console.log('Ocorreu um erro: ' + error.message);
        error.severity = MessagesModel.SEVERITIES.ERROR;
        this.dialogBehavior.showErrorMessage(error);
      });
  }


}
