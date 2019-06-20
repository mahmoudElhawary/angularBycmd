import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  Validators,
  FormGroup
} from '@angular/forms';
import { UserService } from 'src/app/service/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/service/login.service';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  loginUser: any = {};
  users: any[];
  uniqeEmail: boolean ;
  userFile: any = File;
  allFiles: any = [];
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private loginService: LoginService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {
    this.loginService.isLoggedIn();
    this.loginUser = JSON.parse(localStorage.getItem('currentUser'));
    this.signupForm = this.fb.group({
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
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
        Validators.minLength(5),
        Validators.maxLength(31),
        Validators.email
      ]) ,
      gender: new FormControl('', [
        Validators.required
      ]),
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
    if (this.loginUser != null) {
      this.getAllUsers();
    }
  }
  getAllUsers() {
    this.userService.getUsers(this.loginUser.token).subscribe(res => {
      this.users = res ;
      this.users.push(res) ;
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
    // console.log(file);
  }
  signup(signupForm: FormGroup) {
    const UserData = signupForm.value;
    const formData = new FormData();
    console.log(UserData);
    const newEmail: string  = UserData.email;
    if (this.users != null) {
      this.users.forEach(element => {
        if (newEmail === element.email) {
          this.uniqeEmail = false ;
          this.toastr.error('email must be uniqe', 'Oops!');
        } else {
          this.uniqeEmail = true ;
          this.toastr.success('this email is good' , 'Hello our user');
        }
      });
    }
    if ((signupForm.valid)) {
      UserData.enabled = true;
      UserData.role = 'USER' ;
      formData.append('user', JSON.stringify(UserData));
      formData.append('userFile', this.userFile);
      this.userService.signup(formData).subscribe(
        response => {
          if (response) {
            this.users = response ;
            this.toastr.success('this user is regester successfully' , 'Hello our user');
          }
          if (this.loginUser == null) {
            this.router.navigate(['/login']) ;
          }
        },
        err => {
          console.log(err);
          this.toastr.error(err , 'Major Error', {
            timeOut: 5000
          });
        }
      );
    } else {
      console.log('error');
      this.toastr.error('you have an error' , 'Major Error', {
        timeOut: 9000
      });
    }
    // this.signupForm.reset();
  }
}
