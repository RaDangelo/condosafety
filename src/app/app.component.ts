import { Router } from '@angular/router/';
import { ElementRef, Component, AfterViewInit, OnDestroy } from '@angular/core/';
import { ImageBehavior } from '../app/behaviors';
import { ElectronService } from 'ngx-electron';
import { IdleHandler } from './utils';
import * as globalVars from './globals';
import { ConfigService } from './config.service';

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

  get startWarningTimer() {
    return globalVars.GlobalVars.isWarningTimer;
  }

  constructor(rootNode: ElementRef, private route: Router, private imageBehavior: ImageBehavior,
    private electron: ElectronService, private config: ConfigService) {
    this.rootNode = rootNode;

    this.imageBehavior.init();
    this.imageBehavior.openModal$.subscribe(x => {
      this.image = x;
      $('#image-modal').modal('show');
    });

    this.initElectronServices();
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
    const h = today.getHours().toString();
    const m = today.getMinutes().toString();
    const s = today.getSeconds().toString();
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

  private initElectronServices() {
    if (this.config.isElectron) {
      IdleHandler.handleIdle();
      this.afkTimer = this.electron.remote.getGlobal('sharedObj').afk;
      globalVars.GlobalVars.afkTimer = this.afkTimer;
      this.setAfkRoutine();
    }
  }

  private setAfkRoutine() {
    this.afkRoutine = setInterval(this.manageAfkTimer.bind(this), 10000);
  }

  private manageAfkTimer() {
    const idleDate = new Date(globalVars.GlobalVars.idleTimer).getTime();
    const dtAtual = new Date().getTime();
    if (globalVars.GlobalVars.isIdle &&
      (dtAtual - idleDate) >= this.afkTimer * 60000) {
      $('#afk-modal').modal('show');
      globalVars.GlobalVars.isWarningTimer = true;
    }
  }
}
