import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';
import { ProductsService } from 'src/app/service/products.service';
import { LoginService } from 'src/app/service/login.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-promo',
  templateUrl: './promo.component.html',
  styleUrls: ['./promo.component.css']
})
export class PromoComponent implements OnInit {
  categoryName: string;
  id: number;
  page ;
  loginUser: any = {};
  users$;
  products$ ;
  Maxproducts$ ;
  constructor(
    private cartService: CartService,
    private productService: ProductsService,
    private router: Router,
    private loginService: LoginService,
    private userService: UserService,
    private route: ActivatedRoute ,
    private configRate: NgbRatingConfig,
    private toastr: ToastrService
  ) {
    this.loginUser = JSON.parse(localStorage.getItem('currentUser'));
    configRate.readonly = true ;
  }

  ngOnInit() {
    if (this.loginUser) {
      this.users$ = this.userService.getUsers(this.loginUser.token);
    }

    this.categoryName = this.route.snapshot.paramMap.get('categoryName');
    this.getProductsByMaxRating() ;
    this.getProducts() ;
  }

  getProducts() {
    this.products$ = this.productService.getProducts() ;
  }
  viewByMainCategory(CategoryName) {
    this.router.navigate(['products/' + CategoryName]);
    this.toastr.info('Just loaded some products for you.');
  }
  viewBySubCategory(subCategoryName) {
    this.router.navigate(['products/' + subCategoryName]);
    this.toastr.info('Just loaded some products for you.');
  }
  view(productid) {
    this.router.navigate(['product/' + productid]);
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
  getProductsByMaxRating() {
    this.Maxproducts$ = this.productService.maxRatingProducts() ;
  }
}
