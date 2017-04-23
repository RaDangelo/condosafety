import { Component, OnInit } from '@angular/core';

declare var $: any;

@Component({
  selector: 'login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.less']
})
export class LoginPageComponent implements OnInit {

  constructor() {
    $('body').css('background-color', 'transparent');
  }

  ngOnInit() {
  }

}
