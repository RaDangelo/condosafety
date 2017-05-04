import { Router } from '@angular/router/';
import { ElementRef, Component } from '@angular/core/';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {

  rootNode: any;

  constructor (rootNode: ElementRef, private route: Router) {
    this.rootNode = rootNode;
  }
}
