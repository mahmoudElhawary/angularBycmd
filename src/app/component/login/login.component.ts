import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from '@angular/forms';
import { UserService } from 'src/app/service/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/service/login.service';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  badPassword = false ;
  returnUrl: string;
  loginForm: FormGroup;
  constructor(
    private loginService: LoginService,
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute ,
    private location: Location ,
    private toastr: ToastrService
  ) {
    this.loginService.isLoggedIn();
    this.loginForm = this.fb.group({
      email: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(31),
        Validators.email
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(21)
      ])
    });
  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
  }

  login(loginForm: FormGroup) {
    const UserData = loginForm.value;
    if (loginForm.valid) {
      this.userService.loginUsers(UserData).subscribe(
        response => {
          if (response) {
            if (response.token) {
              localStorage.setItem('currentUser', JSON.stringify(response));
              if (response.user.role === 'ADMIN') {
                this.toastr.success('you are login successfully' , 'Hello our user');
                this.router.navigate(['/adminpage']);
              }
              if (response.user.role === 'USER') {
                this.toastr.success('you are login successfully' , 'Hello our user');
                this.router.navigate(['/home']);
              }
            }
          }
        },
        err => {
          console.log(err);
          this.toastr.error('you have an error', 'Oops!');
          console.log(err.status);
          if (err.status === 403) {
            this.badPassword = true ;
            setTimeout(() => {
              this.badPassword = false ;
            }, 4000);
            this.toastr.error('password and username didnt match', 'Oops!');
          }
        }
      );
      this.loginForm.reset();
    }
  }
}
