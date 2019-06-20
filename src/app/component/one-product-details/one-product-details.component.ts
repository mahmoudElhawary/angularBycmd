import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from 'src/app/service/products.service';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/service/login.service';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { CartService } from 'src/app/service/cart.service';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-one-product-details',
  templateUrl: './one-product-details.component.html',
  styleUrls: ['./one-product-details.component.css']
})
export class OneProductDetailsComponent implements OnInit, OnChanges {
  categoryName: string;
  id: number;
  loginUser: any = {};
  user: any = {};
  subscribtion: Subscription;
  product: any = {};
  subCategories$;
  currentRate: number;
  commentForm: FormGroup;
  comments$;
  rating = false;
  constructor(
    private route: ActivatedRoute,
    private productService: ProductsService,
    private location: Location,
    private router: Router,
    private loginService: LoginService,
    private configRate: NgbRatingConfig,
    private cartService: CartService,
    private toastr: ToastrService ,
    private userService: UserService
  ) {
    this.loginService.isLoggedIn();
    this.loginUser = JSON.parse(localStorage.getItem('currentUser'));
    configRate.readonly = false;
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
    this.getComments();
  }

  ngOnChanges() {
    this.route.paramMap.subscribe(params => {
      this.categoryName = params.get('categoryName');
    });
    this.id = +this.route.snapshot.paramMap.get('id');
    this.getProduct();
    this.getComments();
  }
  getProduct() {
    this.subscribtion = this.productService
      .getProduct(this.id)
      .subscribe(data => {
        this.product = data;
      });
  }
  getCommentedUser(id) {
    if (id) {
      this.userService.getUserById(id).subscribe(res => {
        this.user = res ;
      }) ;
    }
  }
  viewBySubCategory(subCategoryName) {
    this.router.navigate(['products/' + subCategoryName]);
    this.toastr.info('You Are show the products by SubCategory');
  }
  getProducts(subName) {
    this.subCategories$ = this.productService.allProductsBySubCategory(subName);
    this.toastr.info('You Are show our products ');
  }
  view(product) {
    this.router.navigate(['product/' + product]);
    // location.reload();
    this.toastr.info('You Are show the products you selected ');
  }
  showUserPage(id) {
    if (id) {
      this.router.navigate(['users/' + id ]) ;
    } else {
      this.toastr.error('this user can not be founded') ;
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
  back() {
    this.location.back();
    this.toastr.info('You Are leaving this page ');
  }
  rateProduct(product) {
    if (product != null) {
      if (this.currentRate) {
        const formData = new FormData();
        formData.append('product', JSON.stringify(product));
        formData.append('rating', JSON.stringify(Number(this.currentRate)));
        this.productService.productRating(formData).subscribe(res => {
          this.product = res;
        });
        this.rating = true;
        setTimeout(() => {
          this.rating = false;
        }, 3000);
        this.toastr.success('Thanks for Rate this product') ;
      }
    } else {
      this.toastr.warning('you have an error on your comment');
    }
  }
  commentProduct(data) {
    if (this.loginUser && data) {
      const formData = new FormData();
      const comment = this.commentForm.value;
      if (data != null && this.commentForm != null) {
        formData.append('product', JSON.stringify(data));
        formData.append('comment', JSON.stringify(comment));
        formData.append('id', JSON.stringify(this.loginUser.user.id));
        this.comments$ = this.productService.commentProduct(formData);
        this.commentForm.reset();
      } else {
        this.toastr.warning('you have an error on your comment');
      }
    } else {
      this.toastr.error('Opss !! , Please Login First');
      this.router.navigate(['/login']);
    }
  }

  getComments() {
    if (this.id != null) {
      this.comments$ = this.productService.getCommentProduct(this.id);
    } else {
      this.toastr.warning('you have an error on your comment');
    }
  }
}
