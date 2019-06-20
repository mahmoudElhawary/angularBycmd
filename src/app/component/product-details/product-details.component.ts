import { Component, OnInit, OnChanges } from '@angular/core';
import { SearchService } from 'src/app/service/search.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { LoginService } from 'src/app/service/login.service';
import { ProductsService } from 'src/app/service/products.service';
import { CartService } from 'src/app/service/cart.service';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit , OnChanges {
  loginUser: any = {};
  searchValue: string;
  subCategories$;
  product: any = {} ;
  constructor(
    private loginService: LoginService,
    private searchService: SearchService,
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductsService,
    private cartService: CartService,
    private location: Location ,
    private toastr: ToastrService
  ) {
    this.loginService.isLoggedIn();
    this.loginUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    // this.route.paramMap.subscribe(params => {
    //   this.searchValue = params.get("searchValue");
    // });
    this.searchValue = this.route.snapshot.paramMap.get('searchValue') ;
    this.searchForOneProduct();
  }

  ngOnChanges() {
    this.searchValue = this.route.snapshot.paramMap.get('searchValue') ;
    this.searchForOneProduct();
  }
  searchForOneProduct() {
    if (this.searchValue != null) {
      this.searchService.searchForOneProduct(this.searchValue).subscribe(res => {
        this.product = res ;
      });
      this.toastr.info('Just loaded some information for you.');
    } else {
      this.toastr.warning('didnt found any products  .', 'Alert!');
    }
  }

  getProducts(subName) {
    this.subCategories$ = this.productService.allProductsBySubCategory(subName);
    this.toastr.info('Just loaded some products for you.');
  }
  back() {
    this.location.back();
    this.toastr.warning('you are leaving this page .', 'Alert!');
  }
  view(product) {
    this.router.navigate(['product/' + product]);
    this.toastr.info('Just loaded your product for you.');
  }
  viewByMainCategory(CategoryName) {
    this.router.navigate(['products/' + CategoryName]);
    this.toastr.info('Just loaded some Main Category products for you.');
  }
  viewBySubCategory(subCategoryName) {
    this.router.navigate(['products/' + subCategoryName]);
    this.toastr.info('Just loaded some Sub Category products for you.');
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
