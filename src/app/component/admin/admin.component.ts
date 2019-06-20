import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/service/login.service';
import { UserService } from 'src/app/service/user.service';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  FormArray
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/service/admin.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  loginUser: any = {};
  users$;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private loginService: LoginService,
    private userService: UserService,
    private adminService: AdminService ,
    private toastr: ToastrService
  ) {
    this.loginService.isLoggedIn();
    this.loginUser = JSON.parse(localStorage.getItem('currentUser'));

  }

  ngOnInit() {
    this.users$ = this.userService.getUsers(this.loginUser.token);
    this.router.navigate(['adminpage/users-admin/users-admin']) ;
  }

  showProducts() {
    this.router.navigate(['products-admin'] , {relativeTo: this.route}) ;
    this.toastr.info('you are show an products');
  }
  showOrders() {
    this.router.navigate(['orders-admin'] , {relativeTo: this.route}) ;
    this.toastr.info('you are show an orders');
  }
  showContacts() {
    this.router.navigate(['contact-admin'] , {relativeTo: this.route}) ;
    this.toastr.info('you are show an contacts');
  }
  showUsers() {
    this.router.navigate(['users-admin'] , {relativeTo: this.route}) ;
    this.toastr.info('you are show an users');
  }
  showCategories() {
    this.router.navigate(['category-admin'] , {relativeTo: this.route}) ;
    this.toastr.info('you are show an categories');
  }
}
