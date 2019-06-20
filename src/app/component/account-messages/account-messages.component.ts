import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-account-messages',
  templateUrl: './account-messages.component.html',
  styleUrls: ['./account-messages.component.css']
})
export class AccountMessagesComponent implements OnInit {

  loginUser: any = {};
  user: any = {};
  page;
  update = false;
  constructor(
    private loginService: LoginService,
  ) {
    this.loginService.isLoggedIn();
    this.loginUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    this.user = this.loginUser.user ;
  }

}
