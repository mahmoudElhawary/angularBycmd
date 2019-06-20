import { Component, OnInit, OnChanges } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/service/login.service';
import { UserService } from 'src/app/service/user.service';
import { MessageService } from 'src/app/service/message.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit, OnChanges {
  loginUser: any = {};
  user: any = {};
  messageFrom: any = {};
  id: number;
  userMessages$;
  MessageForm: FormGroup;
  constructor(
    private loginService: LoginService,
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private messageService: MessageService
  ) {
    this.loginService.isLoggedIn();
    this.loginUser = JSON.parse(localStorage.getItem('currentUser'));
    this.MessageForm = this.fb.group({
      messages: new FormControl('', Validators.required)
    });
  }

  ngOnChanges() {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.getUserMessages();
    this.getSenderData();
    this.user = this.loginUser.user;
  }
  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.getUserMessages();
    this.getSenderData();
    this.user = this.loginUser.user;
  }

  getSenderData() {
    if (this.id) {
      this.userService.getUserById(Number(this.id)).subscribe(res => {
        this.messageFrom = res;
      });
    } else {
      this.toastr.error('ther are an error on Loading this Page');
    }
  }
  getUserMessages() {
    const formData = new FormData();
    formData.append('user', JSON.stringify(this.loginUser.user));
    formData.append('id', JSON.stringify(this.id));
    this.userMessages$ = this.messageService.getMessagesToThisSender(formData) ;
  }
  sendMessage(data) {
    if (data) {
      const productData = this.MessageForm.value;
      const formData = new FormData();
      if (this.MessageForm.valid) {
        formData.append('message', JSON.stringify(productData));
        formData.append('user', JSON.stringify(this.loginUser.user));
        formData.append('id', JSON.stringify(this.id));
        this.userMessages$ = this.messageService.sendMessage(formData);
        this.getUserMessages() ;
        this.toastr.success('Message Sent Successfully ');
      }
    }
    this.MessageForm.reset();
  }
  showUserPage(id) {
    if (id != null) {
      this.router.navigate(['users/' + id]);
    } else {
      this.toastr.error('this user profile can not be opend');
    }
  }
  deleteMessage(id) {
    if (id) {
      if (confirm('Are You Sure want to delete this Message ?')) {
        this.messageService.deleteById(id);
        this.toastr.success('this Message Deleted Successfully');
        this.getUserMessages();
      } else {
        this.toastr.info('this Message Cancel Delete');
      }
    } else {
      this.toastr.error('Message can not be deleted');
    }
  }
}
