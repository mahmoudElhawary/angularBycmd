import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { LoginService } from 'src/app/service/login.service';
import { UserService } from 'src/app/service/user.service';
import { AdminService } from 'src/app/service/admin.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-users-admin',
  templateUrl: './users-admin.component.html',
  styleUrls: ['./users-admin.component.css']
})
export class UsersAdminComponent implements OnInit {
  loginUser: any = {};
  signupForm: FormGroup;
  uniqeEmail = true;
  newEmail;
  page ;
  users: any = [];
  userFile: any = File;
  allFiles: any = [];
  constructor(
    private loginService: LoginService,
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    private adminService: AdminService ,
    private toastr: ToastrService
  ) {
    this.loginService.isLoggedIn();
    this.loginUser = JSON.parse(localStorage.getItem('currentUser'));
    // create user form
    this.signupForm = this.fb.group({
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(21)
      ]),
      firstName: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(21),
        Validators.pattern('[a-zA-Z]*')
      ]),
      lastName: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(21),
        Validators.pattern('[a-zA-Z]*')
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(31),
        Validators.email
      ]),
      gender: new FormControl('', [Validators.required]),
      role: new FormControl('', [Validators.required]),
      age: new FormControl('', [Validators.required]),
      userAdresses : new FormGroup({
        address: new FormControl(''),
        country: new FormControl(''),
        city: new FormControl(''),
        state: new FormControl(''),
      }) ,
      userSocialMedias : new FormGroup({
        facebook: new FormControl(''),
        twitter: new FormControl(''),
        githup: new FormControl(''),
        googlePlus: new FormControl(''),
        instagram: new FormControl(''),
        linkedIn: new FormControl(''),
      }) ,
    });
  }
  ngOnInit() {
    this.getAllUsers();
    this.newEmail = this.signupForm.controls.email.value;
    this.checkEmailUniq();
  }

  getAllUsers() {
    if (this.loginUser != null) {
      this.userService.getUsers(this.loginUser.token).subscribe(res => {
        this.users = res ;
      });
    } else {
      this.toastr.error('you must login as an admin first') ;
    }
  }

  showProfile(id) {
    if (id != null) {
      this.router.navigate(['users/' + id ]) ;
    } else {
      this.toastr.error('') ;
    }
  }
  checkEmailUniq() {
    // this.newEmail = this.signupForm.controls.email.value;
    this.users.forEach(element => {
      if (this.newEmail === element.email) {
        this.uniqeEmail = false;
        setTimeout(() => {
          this.uniqeEmail = true;
        }, 4000);
        this.toastr.warning('You are email is not good', 'Alert!');
        this.signupForm.reset() ;
      } else {
        this.uniqeEmail = true;
        this.toastr.success('You are email is good !', 'Success!');
      }
    });
  }
  onSelectFile(event) {
    // profile image
    const file = event.target.files[0];
    // multiple file
    const files = event.target.files;
    for (let index = 0; index < files.length; index++) {
      this.allFiles.push(files[index]);
      // console.log(files[index]) ;
    }
    this.userFile = file;
    this.toastr.info('you are successfully loaded your photo');
    // console.log(file);
  }
  signup(signupForm: FormGroup) {
    const UserData = signupForm.value;
    const formData = new FormData();
    this.checkEmailUniq();
    if (signupForm.valid && this.uniqeEmail === true) {
      UserData.enabled = true;
      formData.append('user', JSON.stringify(UserData));
      formData.append('userFile', this.userFile);
      this.userService.signup(formData).subscribe(
        response => {
          if (response) {
            this.users = response ;
            this.toastr.success('You are successfully create an user!', 'Success!');
          }
          if (this.loginUser == null) {
            this.router.navigate(['/login']) ;
          }
        },
        err => {
          this.toastr.error('you are having an error ' + err, 'Oops!');
        }
      );
    }
    this.signupForm.reset();
  }
}
