import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ElectronService } from 'ngx-electron';
import { ConfigService } from '../../config.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.less']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router, private electron: ElectronService, private config: ConfigService) { }

  ngOnInit() {
  }

  isActive(url: string): boolean {
    return this.router.isActive(url, true);
  }

  logout() {
    // if (this.config.isElectron) {
      // this.electron.remote.getCurrentWindow().close();
    // } else {
      this.router.navigate(['/']);
    // }
  }

  isHighLevel() {
    if (localStorage.getItem('accessLevel') === '0') {
      return true;
    }
    return false;
  }

}
