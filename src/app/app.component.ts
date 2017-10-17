import { Router } from '@angular/router/';
import { ElementRef, Component, AfterViewInit } from '@angular/core/';
import { ImageBehavior } from '../app/behaviors';

declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements AfterViewInit {

  rootNode: any;
  image: String;

  constructor(rootNode: ElementRef, private route: Router, private imageBehavior: ImageBehavior) {
    this.imageBehavior.init();
    this.imageBehavior.openModal$.subscribe(x => {
      this.image = x;
      $('#image-modal').modal('show');
    });
    this.rootNode = rootNode;
  }

  ngAfterViewInit() {
    this.startTime();
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
}
