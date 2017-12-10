import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ElectronService } from 'ngx-electron';
import { ConfigService } from '../../config.service';
import { WatchControlServiceInterface } from '../../interfaces';
import { WatchControlModel, Action } from '../../models';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.less']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router, private electron: ElectronService, private config: ConfigService,
    private watchControlService: WatchControlServiceInterface) { }

  ngOnInit() {
  }

  isActive(url: string): boolean {
    return this.router.isActive(url, true);
  }

  logout() {
    const watch = new WatchControlModel();
    watch.user.username = localStorage.getItem('username');
    watch.action = Action.LOGOUT;
    watch.date = new Date();
    this.watchControlService.logout(watch).subscribe(() => {
      this.router.navigate(['/']);
    }, err => console.log('Erro ao fazer logout!'));
  }

  isHighLevel() {
    if (localStorage.getItem('accessLevel') === '0') {
      return true;
    }
    return false;
  }

}
