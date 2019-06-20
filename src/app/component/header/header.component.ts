import { Component, OnInit, OnDestroy, ViewChild, OnChanges } from '@angular/core';
import { LoginService } from 'src/app/service/login.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { SearchService } from 'src/app/service/search.service';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit , OnChanges {
  user: any = {};
  admin: string;
  currentStatus: any;
  loginUser: any = {};
  searchValue: string;
  products$;
  products: any[];
  productsNames$;
  search = new FormControl('');
  isActive = false ;
  constructor(
    private loginService: LoginService,
    private searchService: SearchService,
    private router: Router,
    private userService: UserService,
    private toastr: ToastrService
  ) {
    this.loginService.isLoggedIn();
    this.loginUser = JSON.parse(localStorage.getItem('currentUser'));
    this.currentStatus = this.loginService.getStatus().subscribe(status => {
      this.currentStatus = status;
    });
  }

  ngOnInit() {
    if (this.loginUser) {
      this.userService.getUser(this.loginUser.token).subscribe(
        userData => {
          this.user = userData;
          if (userData.role === 'ADMIN') {
            this.admin = userData.role;
          }
        },
        err => {
          console.log(err);
        }
      );
    }
  }
  ngOnChanges() {
    if (this.loginUser) {
      this.userService.getUser(this.loginUser.token).subscribe(
        userData => {
          this.user = userData;
          if (userData.role === 'ADMIN') {
            this.admin = userData.role;
          }
        },
        err => {
          console.log(err);
        }
      );
    }
  }
  searchNames() {
    if (this.searchValue != null) {
      this.productsNames$ = this.searchService.getRequiredProductsName(
        this.searchValue
      );
    } else {
      this.toastr.info('your search key didnt found any value');
    }
  }
  searchButtom() {
    if (this.searchValue != null) {
      this.router.navigate(['search/' + this.searchValue]);
      this.toastr.info('Just loaded some information about your search.');
      this.search.reset();
    }
  }
  show(name) {
    if (name != null) {
      this.router.navigate(['searchedProducts/' + name]);
      this.toastr.info('Just loaded some information about your search.');
      this.search.reset();
    }
  }
  logout() {
    if (confirm('Are you Sure want to logout ?')) {
      localStorage.removeItem('currentUser');
      this.toastr.warning('You are logout successfully .', 'Alert!');
      this.router.navigate(['/home']);
      location.reload();
    } else {
      this.toastr.info('wow!! you still in the el hawary prrogram');
    }
  }
}
