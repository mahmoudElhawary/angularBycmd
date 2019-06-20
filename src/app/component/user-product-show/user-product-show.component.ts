import { Component, OnInit, OnChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from 'src/app/service/products.service';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/service/login.service';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { CartService } from 'src/app/service/cart.service';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/service/user.service';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { UserProductsService } from 'src/app/service/user-products.service';
@Component({
  selector: 'app-user-product-show',
  templateUrl: './user-product-show.component.html',
  styleUrls: ['./user-product-show.component.css']
})
export class UserProductShowComponent implements OnInit , OnChanges {
  categoryName: string;
  id: number;
  loginUser: any = {};
  subscribtion: Subscription;
  product: any = {};
  subCategories$;
  currentRate: number;
  comments$;
  commentForm: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private router: Router,
    private loginService: LoginService,
    private configRate: NgbRatingConfig,
    private cartService: CartService,
    private toastr: ToastrService,
    private userService: UserService,
    private userProductService: UserProductsService
  ) {
    this.loginService.isLoggedIn();
    this.loginUser = JSON.parse(localStorage.getItem('currentUser'));
    this.commentForm = new FormGroup({
      commentCotents: new FormControl('')
    });
  }
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.categoryName = params.get('categoryName');
    });
    this.id = +this.route.snapshot.paramMap.get('id');
    this.getProduct();
  }

  ngOnChanges() {
    this.route.paramMap.subscribe(params => {
      this.categoryName = params.get('categoryName');
    });
    this.id = +this.route.snapshot.paramMap.get('id');
    this.getProduct();
  }
  getProduct() {
    if (this.id != null) {
      this.userProductService.getProduct(this.id).subscribe(
        data => {
          this.product = data;
          this.toastr.info(
            'You Are Selected this Product ' + this.product.productName
          );
        },
        err => {
          this.toastr.error('you have an error !!', 'oopps !');
        }
      );
    } else {
      this.toastr.warning('this product is not founded');
    }
  }
  viewBySubCategory(subCategoryName) {
    this.router.navigate(['products/' + subCategoryName]);
    this.toastr.info('You Are show the products by SubCategory');
  }
  getProducts(subName) {
    this.subCategories$ = this.userProductService.allProductsBySubCategory(
      subName
    );
    this.toastr.info('You Are show our products ');
  }
  view(product) {
    this.router.navigate(['userProducts/' + product]);
    location.reload();
    this.toastr.info('You Are show the products you selected ');
  }
  back() {
    this.location.back();
    this.toastr.info('You Are leaving this page ');
  }
  rateProduct(product) {
    if (product != null) {
      product.rating = Number(this.currentRate);
      this.userProductService.userProductRating(product).subscribe(res => {
        this.product = res;
        console.log(res.rating);
        // this.currentRate = res.rating ;
      });
    } else {
      this.toastr.warning('you have an error on your comment');
    }
  }
  commentProduct(data) {
    const formData = new FormData();
    const comment = this.commentForm.value;
    if (data != null && this.commentForm != null && this.loginUser.user) {
      formData.append('product', JSON.stringify(data));
      formData.append('comment', JSON.stringify(comment));
      this.comments$ = this.userProductService.userProductComment(formData);
    } else {
      this.toastr.warning('you have an error on your comment');
    }
  }

  getComments() {
    if (this.id != null) {
      this.comments$ = this.userProductService.userProductComments(this.id);
    } else {
      this.toastr.warning('you have an error on your comment');
    }
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
