import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/service/login.service';
import { UserService } from 'src/app/service/user.service';
import { AdminService } from 'src/app/service/admin.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contact-admin',
  templateUrl: './contact-admin.component.html',
  styleUrls: ['./contact-admin.component.css']
})
export class ContactAdminComponent implements OnInit {

  messages$;
  loginUser: any = {};
  constructor(private loginService: LoginService,
    private userService: UserService,
    private adminService: AdminService ,
    private toastr: ToastrService) {
    this.loginService.isLoggedIn();
    this.loginUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    this.getAllMessages();
  }

  getAllMessages() {
    this.messages$ = this.adminService
      .getMessagesData(this.loginUser.token);
      this.toastr.info('all messages are loaded.');
  }
}
