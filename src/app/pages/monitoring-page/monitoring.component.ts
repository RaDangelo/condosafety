import { MessageDialogBehavior } from '../../behaviors';
import * as path from 'path';
import { Stream } from 'stream';
import { Component, ViewChild, ElementRef, ViewChildren, QueryList, AfterViewInit } from '@angular/core';

import { PersonModel, UserModel, VisitorModel, MessagesModel } from '../../models';
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
  videos2: Array<ElementRef>;
  selected: any;
  filter = '';
  accessPassword: string;
  user: UserModel;

  @ViewChild('myname') input: ElementRef;
  @ViewChild('video4') video1: ElementRef;
  @ViewChild('video1') video2: ElementRef;
  @ViewChild('video2') video3: ElementRef;
  @ViewChild('video3') video4: ElementRef;



  @ViewChildren('div1,div2,div3') divs: QueryList<ElementRef>;

  constructor(private accessService: AccessServiceInterface, private dialogBehavior: MessageDialogBehavior) {
    this.filterResult = new Array<Object>();
    this.videos = new Array<ElementRef>();
    this.videos2 = new Array<ElementRef>();
    this.user = new UserModel();
    this.img = '../../../../dist/assets/img-test.png';
  }

  ngAfterViewInit() {
    this.videos = [this.video1, this.video2, this.video3, this.video4];

    navigator.mediaDevices.enumerateDevices()
      .then(this.gotDevices.bind(this));

    console.log(navigator.mediaDevices.enumerateDevices());
  }

  private gotDevices(infos) {
    let inputs: any[] = [];
    for (let i of infos) {
      if (i.kind === 'videoinput') {
        inputs.push(i);
      }
    }

    for (let v of this.videos) {
      let nv = v.nativeElement;
      let userMedia: any;
      // if (inputs[this.videos.indexOf(v)]) {
        userMedia = inputs[1];
      // } else {
        // userMedia = inputs[1];
      // }
      let media: MediaTrackConstraints = { deviceId: userMedia.deviceId };
      navigator.mediaDevices.getUserMedia({ video: media })
        .then(stream => {
          console.log(stream);
          nv.src = window.URL.createObjectURL(stream);
          nv.play();
        })
    }
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
