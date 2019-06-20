import { Component, OnInit, OnChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/service/login.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit , OnChanges {
  loginUser: any = {};
  user: any = {};
  users$;
  page ;
  constructor(
    private router: Router,
    private loginService: LoginService,
    private route: ActivatedRoute,
    private toastr: ToastrService ,
    private userService: UserService
  ) {
    this.loginService.isLoggedIn();
    this.loginUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    this.getUsers() ;
  }

  ngOnChanges() {
    this.getUsers() ;
  }
  getUsers() {
    if (this.loginUser != null) {
      this.users$ = this.userService.getUsers(this.loginUser.token) ;
    } else {
      this.toastr.error('you have an error on loading users') ;
    }
  }
  showUser(id) {
    if (id != null) {
      this.router.navigate(['users/' + id ]) ;
    } else {
      this.toastr.error('this user profile can not be opend') ;
    }
  }
}
