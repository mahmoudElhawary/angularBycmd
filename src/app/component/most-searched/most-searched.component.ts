import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/service/products.service';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/login.service';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-most-searched',
  templateUrl: './most-searched.component.html',
  styleUrls: ['./most-searched.component.css']
})
export class MostSearchedComponent implements OnInit {

  searchedProducts$ ;
  loginUser: any = {};
  page ;
  constructor(private productService: ProductsService,
    private router: Router,
    private loginService: LoginService ,
    private cartService: CartService ,
    private toastr: ToastrService) {
      this.loginService.isLoggedIn();
      this.loginUser = JSON.parse(localStorage.getItem('currentUser'));
    }

  ngOnInit() {
    this.maxSearchingProducts() ;
  }

  view(product) {
    this.router.navigate(['product/' + product]);
    this.toastr.info('Just loaded your selected product for you.');
  }
  maxSearchingProducts() {
    this.searchedProducts$ = this.productService.maxSearchingProducts();
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
}
