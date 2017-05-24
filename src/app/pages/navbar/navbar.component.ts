import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.less']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router, ) { }

  ngOnInit() {
  }

  isActive(url: string): boolean {
    return this.router.isActive(url, true);
  }

}
