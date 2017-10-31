import { Router } from '@angular/router/';
import { ElementRef, Component, AfterViewInit, OnDestroy } from '@angular/core/';
import { ImageBehavior } from '../app/behaviors';
import { ElectronService } from 'ngx-electron';
import { IdleHandler } from './utils';
import * as globalVars from './globals';

declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements AfterViewInit, OnDestroy {

  rootNode: any;
  image: String;
  afkRoutine: any;
  afkTimer = 0;

  constructor(rootNode: ElementRef, private route: Router, private imageBehavior: ImageBehavior,
    private electron: ElectronService) {
    this.rootNode = rootNode;

    this.imageBehavior.init();
    this.imageBehavior.openModal$.subscribe(x => {
      this.image = x;
      $('#image-modal').modal('show');
    });
    IdleHandler.handleIdle();
    this.afkTimer = electron.remote.getGlobal('sharedObj').afk;
    this.setAfkRoutine();
  }

  ngAfterViewInit() {
    this.startTime();
  }

  ngOnDestroy() {
    this.afkTimer = 0;
    clearInterval(this.afkRoutine);
  }

  private startTime() {
    const today = new Date();
    let h = today.getHours().toString();
    let m = today.getMinutes().toString();
    let s = today.getSeconds().toString();
    document.getElementById('clock').innerHTML =
      ' - ' + this.checkTime(today.getDate().toString()) + '/' + this.checkTime(today.getMonth().toString()) +
      '/' + today.getFullYear() + ' - ' + this.checkTime(h) + ':' + this.checkTime(m) + ':' + this.checkTime(s);
    const t = setTimeout(this.startTime.bind(this), 500);
  }

  private checkTime(i: string): string {
    if (parseFloat(i) < 10) {
      i = '0' + i;
    };
    return i;
  }

  getUser() {
    return localStorage.getItem('username');
  }

  private setAfkRoutine() {
    this.afkRoutine = setInterval(this.manageAfkTimer.bind(this), 60000);
  }

  private manageAfkTimer() {
    const idleDate = new Date(globalVars.GlobalVars.idleTimer).getTime();
    const dtAtual = new Date().getTime();
    console.log('idleDate', globalVars.GlobalVars.isIdle, idleDate);
    if (globalVars.GlobalVars.isIdle &&
      (dtAtual - idleDate) >= this.afkTimer * 60000) {
      $('#modal-afk').modal('show');
    }
  }
}
