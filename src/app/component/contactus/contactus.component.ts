import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/service/user.service';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/login.service';
import { AdminService } from 'src/app/service/admin.service';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent implements OnInit {

  contactUsForm: FormGroup ;
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private loginService: LoginService ,
    private adminService: AdminService,
    private toastr: ToastrService
  ) {
    this.loginService.isLoggedIn();
    this.contactUsForm = this.fb.group({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(21),
      ]),
      subject: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(21),
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(31),
        Validators.email
      ]),
      company: new FormControl('', [
        Validators.minLength(5),
        Validators.maxLength(21),
      ]),
      message: new FormControl('', [
        Validators.required,
        Validators.minLength(15),
        Validators.maxLength(91),
      ]),
    });
  }
  ngOnInit(): void {
  }
  setMessage(contactUsForm: FormGroup) {
    const messageData = contactUsForm.value;
    console.log(messageData);
    if (contactUsForm.valid) {
      messageData.enabled = true;
      this.adminService.contactUsData(messageData).subscribe(
        response => {
          if (response) {
            this.toastr.success('You are successfully make your contacts', 'Success!');
          }
          this.router.navigate(['/home']) ;
        },
        err => {
          this.toastr.error('there is an error happend!', 'Oops!');
        }
      );
    }
    this.contactUsForm.reset();
  }

}
