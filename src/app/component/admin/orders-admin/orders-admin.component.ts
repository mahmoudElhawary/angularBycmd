import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/service/login.service';
import { UserService } from 'src/app/service/user.service';
import { AdminService } from 'src/app/service/admin.service';
import { ToastrService } from 'ngx-toastr';
import { OrderService } from 'src/app/service/order.service';
import { CartService } from 'src/app/service/cart.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-orders-admin',
  templateUrl: './orders-admin.component.html',
  styleUrls: ['./orders-admin.component.css']
})
export class OrdersAdminComponent implements OnInit {
  orders$ ;
  loginUser: any = {};
  constructor(
    private loginService: LoginService,
    private userService: UserService,
    private orderService: OrderService ,
    private adminService: AdminService ,
    private toastr: ToastrService ,
    private cartService: CartService,
  ) {
    this.loginService.isLoggedIn();
    this.loginUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    this.getAllOrders() ;
  }

  getAllOrders() {
    if (this.loginUser.user) {
      this.orders$ = this.orderService.getAllOrders();
    } else {
      this.toastr.error('there is no user') ;
    }
  }
}
