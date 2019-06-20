import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { CartService } from 'src/app/service/cart.service';
import { LoginService } from 'src/app/service/login.service';
import { ToastrService } from 'ngx-toastr';
import { ProductsService } from 'src/app/service/products.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  loginUser: any = {};
  product$;
  constructor(private router: Router,
    private location: Location,
    private cartService: CartService,
    private productService: ProductsService ,
    private loginService: LoginService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.maxProductsPrice();
  }

  maxProductsPrice () {
    this.product$ = this.productService.maxProductsPrice() ;
  }
  view(product) {
    this.router.navigate(['product/' + product]);
    this.toastr.info('Just loaded your selected product for you.');
  }
  addToCart(item) {
    if (this.loginUser) {
      if (item != null) {
        const formData = new FormData();
        formData.append('product', JSON.stringify(item));
        formData.append('user', JSON.stringify(this.loginUser.user));
        this.cartService.saveCart(formData).subscribe(
          response => {
            if (response) {
              this.toastr.success(
                'You are added this product to your cart',
                'Success!'
              );
            }
          },
          err => {
            this.toastr.error('you have an error!', 'Oops!');
          }
        );
      }
    } else {
      this.toastr.error('please Login First', 'Oops!');
      this.router.navigate(['/login']);
    }
  }
  back() {
    this.location.back();
    this.toastr.warning('You are leaving this page now .', 'Alert!');
  }
}
