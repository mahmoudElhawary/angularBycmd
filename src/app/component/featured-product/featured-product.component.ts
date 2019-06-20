import { Component, OnInit } from '@angular/core';
import { NgbRatingConfig, NgbTabsetConfig } from '@ng-bootstrap/ng-bootstrap';
import { CategoryService } from 'src/app/service/category.service';
import { ProductsService } from 'src/app/service/products.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { CartService } from 'src/app/service/cart.service';
import { LoginService } from 'src/app/service/login.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-featured-product',
  templateUrl: './featured-product.component.html',
  styleUrls: ['./featured-product.component.css']
})
export class FeaturedProductComponent implements OnInit {

  mainCategories$ ;
  products$ ;
  Ratingproducts$ ;
  seelinproducts$ ;
  Newestproducts$ ;
  Viewingproducts$ ;
  commentproducts$ ;
  page = 1 ;
  loginUser: any = {};
  constructor(private config: NgbTabsetConfig,
    private categoryService: CategoryService ,
    private productService: ProductsService,
    private router: Router,
    private location: Location,
    private cartService: CartService,
    private loginService: LoginService,
    private configRate: NgbRatingConfig,
    private toastr: ToastrService) {
    this.config.justify = 'center' ;
    config.type = 'pills';
    this.loginService.isLoggedIn();
    this.loginUser = JSON.parse(localStorage.getItem('currentUser'));
    configRate.readonly = true ;
  }

  ngOnInit() {
    this.getMainCategories() ;
    this.maxRatingProducts();
    this.maxSellingProducts();
    this.maxViewProducts();
    this.newestProducts();
    this.maxCommentProducts() ;
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
  getMainCategories() {
    this.mainCategories$ = this.categoryService.getMainCategories();
  }
  maxRatingProducts() {
    this.Ratingproducts$ = this.productService.maxRatingProducts();
  }
  maxSellingProducts() {
    this.seelinproducts$ = this.productService.maxSellingProducts();
  }
  maxViewProducts() {
    this.Viewingproducts$ = this.productService.maxViewProducts();
  }
  maxCommentProducts() {
    this.commentproducts$ = this.productService.maxCommentProducts();
  }
  newestProducts() {
    this.Newestproducts$ = this.productService.newestProducts();
  }
}
