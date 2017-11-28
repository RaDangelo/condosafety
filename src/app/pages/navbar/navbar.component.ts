import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ElectronService } from 'ngx-electron';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.less']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router, private electron: ElectronService ) { }

  ngOnInit() {
  }

  isActive(url: string): boolean {
    return this.router.isActive(url, true);
  }

  logout() {
    this.electron.remote.getCurrentWindow().close();
  }

}
