import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { LoginService } from 'src/app/service/login.service';
import { CartService } from 'src/app/service/cart.service';
import { Location } from '@angular/common';
import { Unsubscribable, Subscription, Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder
} from '@angular/forms';
import { OrderService } from 'src/app/service/order.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnChanges {
  total = 0;
  AllCarts$;
  loginUser: any = {};
  AllData: object[];
  carts: object[];
  prodcts = new Array();
  quantity = new FormControl('', [
    Validators.required,
    Validators.pattern('[1-9]+')
  ]);
  cart: any = {};
  badPassword = false;
  returnUrl: string;
  loginForm: FormGroup;
  ShippingForm: FormGroup;
  constructor(
    private loginService: LoginService,
    private cartService: CartService,
    private location: Location,
    private toastr: ToastrService,
    private orderService: OrderService,
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.loginService.isLoggedIn();
    this.loginUser = JSON.parse(localStorage.getItem('currentUser'));
    this.ShippingForm = this.fb.group({
      fullName: new FormControl('', Validators.required),
      phoneNumber: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required),
      zipCode: new FormControl('', Validators.required)
      // specialNotes: new FormControl(''),
    });

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
    if (this.loginUser) {
      this.getCartByUser();
      this.getCartByUserId();
    }
  }

  ngOnChanges() {
    if (this.loginUser) {
      this.getCartByUser();
      this.getCartByUserId();
    }
  }
  getCartByUserId() {
    if (this.loginUser) {
      this.AllCarts$ = this.cartService.getCartByUserId(this.loginUser.user.id);
    }
  }
  getCartByUser() {
    if (this.loginUser) {
      this.cartService.getCartByUserId(this.loginUser.user.id).subscribe(
        response => {
          this.AllData = response as object[];
          this.AllData.map(cartss => {
            this.carts = cartss['cartItems'];
            this.carts.forEach(items => {
              this.prodcts.push(items['product']);
              this.total = this.total + items['totalPriceDouble'];
            });
          });
        },
        err => {
          this.toastr.error('there is an error happend', 'Oops!');
        }
      );
    }
  }
  updateCart(cart) {
    if (cart != null) {
      const formData = new FormData();
      for (let index = 0; index < this.AllData.length; index++) {
        const element = this.AllData[index];
        if (cart === index) {
          formData.append('cart', JSON.stringify(element));
          if (this.quantity.value != null) {
            formData.append('quantity', JSON.stringify(this.quantity.value));
            this.cartService.updateCart(formData).subscribe(response => {
              this.AllData = response as object[];
              this.AllData.map(cartss => {
                this.carts = cartss['cartItems'];
                this.carts.forEach(items => {
                  this.prodcts.push(items['product']);
                  this.total = this.total + items['totalPriceDouble'];
                });
              });
            });
          } else {
            this.toastr.error(
              'if you want to update your cart please set quantity'
            );
          }
        }
      }
      // console.log(this.carts) ;
      // console.log(this.allCarts) ;
    } else {
      this.toastr.error('the cart is empty');
    }
  }
  deletFromCart(cart) {
    if (cart != null) {
      if (confirm('Are you sure want to remove this product from your cart')) {
        const formData = new FormData();
        for (let index = 0; index < this.AllData.length; index++) {
          const element = this.AllData[index];
          if (cart === index) {
            formData.append('cart', JSON.stringify(element));
            formData.append('user', JSON.stringify(this.loginUser.user));
            this.cartService.deleteFromCart(formData);
            location.reload();
          }
        }
      }
    } else {
      this.toastr.error('the cart is empty');
    }
  }
  back() {
    this.location.back();
    this.toastr.warning('You are leaving this page', 'Alert!');
  }
  setUserOrder(ShippingForm: FormGroup) {
    const shippingData = ShippingForm.value;
    const formData = new FormData();
    if (ShippingForm.valid && this.loginUser) {
      shippingData.user = this.loginUser.user;
      shippingData.isDefault = true;
      formData.append('user', JSON.stringify(this.loginUser.user));
      formData.append('shippingAddress', JSON.stringify(shippingData));
      this.orderService.setUserOrder(formData).subscribe(
        response => {
          this.toastr.success('You are successfully', 'Success!');
          this.router.navigate(['/home']);
        },
        err => {
          this.toastr.error('there is an error happend!', 'Oops!');
        }
      );
    }
    this.ShippingForm.reset();
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
                this.toastr.success(
                  'You are successfully login as an admin',
                  'Success!'
                );
                this.router.navigate(['/adminpage']);
              }
              if (response.user.role === 'USER') {
                this.toastr.success('You are successfully login', 'Success!');
                this.router.navigate([this.returnUrl]);
              }
            }
          }
        },
        err => {
          this.toastr.error('there is an error happend!', 'Oops!');
          if (err.status === 403) {
            this.badPassword = true;
            this.toastr.error('username and password didnt matched', 'Oops!');
          }
        }
      );
      this.loginForm.reset();
    }
    this.loginForm.reset();
  }
}
