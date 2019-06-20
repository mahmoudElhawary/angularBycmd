import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig, NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from 'src/app/service/products.service';
import { Location } from '@angular/common';
import { CartService } from 'src/app/service/cart.service';
import { LoginService } from 'src/app/service/login.service';
import { UserService } from 'src/app/service/user.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
  providers: [NgbCarouselConfig, NgbRatingConfig]
})
export class CarouselComponent implements OnInit {
  products: any = [];
  products$;
  product: any = {};
  categoryName: string;
  id: number;
  loginUser: any = {};
  cartForm: FormGroup;
  constructor(
    configSlider: NgbCarouselConfig,
    private configRate: NgbRatingConfig,
    private route: ActivatedRoute,
    private productService: ProductsService,
    private router: Router,
    private cartService: CartService,
    private location: Location,
    private loginService: LoginService,
    private userService: UserService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {
    // customize default values of carousels used by this component tree
    configSlider.interval = 5000;
    configSlider.wrap = false;
    configSlider.keyboard = false;
    configSlider.pauseOnHover = false;
    configSlider.showNavigationArrows = true;
    configSlider.showNavigationIndicators = true;
    // customize default values of ratings used by this component tree
    configRate.readonly = true;
    this.loginService.isLoggedIn();
    this.loginUser = JSON.parse(localStorage.getItem('currentUser'));

    this.cartForm = this.fb.group({
      cartItems: new FormGroup({
        product: new FormControl(''),
        quantity: new FormControl('')
      })
    });
  }
  ngOnInit() {
    this.categoryName = this.route.snapshot.paramMap.get('categoryName');
    this.getProducts();
  }

  getProducts() {
    this.products$ = this.productService.sliderProducts();
  }
  back() {
    this.location.back();
    this.toastr.warning('You are being warned.', 'Alert!');
  }
  viewByMainCategory(CategoryName) {
    this.router.navigate(['products/' + CategoryName]);
    this.toastr.info('Just some information for you.');
  }
  viewBySubCategory(subCategoryName) {
    this.router.navigate(['products/' + subCategoryName]);
    this.toastr.info('Just some information for you.');
  }
  view(productid) {
    this.router.navigate(['product/' + productid]);
    this.toastr.info('Just some information for you.');
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
