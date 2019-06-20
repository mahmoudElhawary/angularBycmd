import { Component, OnInit, OnChanges } from '@angular/core';
import { LoginService } from 'src/app/service/login.service';
import { UserService } from 'src/app/service/user.service';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { CategoryService } from 'src/app/service/category.service';
import { ProductsService } from 'src/app/service/products.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/service/cart.service';
import { ToastrService } from 'ngx-toastr';
import { UserProductsService } from 'src/app/service/user-products.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit , OnChanges {
  loginUser: any = {} ;
  user: any = {};
  users$;
  productForm: FormGroup;
  products$;
  categories$;
  subCategories$;
  mainCategories$;
  address$ ;
  selectedOption;
  id: number ;
  productFile: any = File;
  allFiles: any = [];
  constructor(private loginService: LoginService ,
    private userService: UserService,
    private fb: FormBuilder,
    private categoryService: CategoryService ,
    private productService: ProductsService,
    private router: Router ,
    private route: ActivatedRoute ,
    private cartService: CartService,
    private userProductService: UserProductsService,
    private toastr: ToastrService) {
    this.loginService.isLoggedIn() ;
    this.loginUser = JSON.parse(localStorage.getItem('currentUser')) ;
    // product Form
    this.productForm = this.fb.group({
      productName: new FormControl('', [Validators.required]),
      color: new FormControl('', [Validators.required]),
      size: new FormControl('', [Validators.required]),
      coupon: new FormControl('', [Validators.required]),
      slider: new FormControl('', [Validators.required]),
      defaultSize: new FormControl('', [Validators.required]),
      productSummary: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      productDescription: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      productDate: new FormControl('', [Validators.required]),
      // productViews: new FormControl('', [Validators.required]),
      productPrice: new FormControl('', [Validators.required]),
      productCondition: new FormControl('', [Validators.required]),
      quantity: new FormControl('', [Validators.required]),
      productCategory: new FormGroup({
        mainCategoryName: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(21)
        ]),
        subCategoryName: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(21)
        ])
      })
    });
  }
  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get('id') ;
    this.getUser();
    this.getProductByUserId();
  }
  ngOnChanges() {
    this.id = +this.route.snapshot.paramMap.get('id') ;
    this.getUser();
    this.getProductByUserId();
  }
  getUser() {
    if (this.id != null || this.id > 0) {
      this.userService.getUserById(this.id).subscribe(userData => {
        this.user = userData ;
      } , err => {
        console.log(err) ;
      }) ;
    } else {
        this.toastr.error('you must make an order to fill in your Address', 'Oops!');
      }
  }
  getProductByUserId() {
    if (this.id != null) {
      this.products$ = this.userProductService.getProductByUserId(this.id) ;
    } else {
      this.toastr.error('please login first') ;
      this.router.navigate(['/login']) ;
    }
  }
  getUserAddress() {
    if (this.loginUser.user != null) {
      this.address$ = this.userService.getUserAddress(this.loginUser.user).subscribe(res => {
        console.log(res) ;
      }) ;
    } else {
      this.toastr.error('you must make an order to fill in your Address', 'Oops!');
    }
  }
  getProducts() {
    this.products$ = this.productService.getProducts() ;
  }
  viewByMainCategory(CategoryName) {
    this.router.navigate(['products/' + CategoryName]);
  }
  viewBySubCategory(subCategoryName) {
    this.router.navigate(['products/' + subCategoryName]);
  }
  view(productid) {
    this.router.navigate(['userProduct/' + productid]);
  }
  addToCart(item) {
    if (item != null) {
      const formData = new FormData();
      formData.append('product', JSON.stringify(item));
      formData.append('user', JSON.stringify(this.loginUser.user));
      this.cartService.saveUserProductsCart(formData).subscribe(response => {
        this.toastr.success('you are added this product to your cart successfully') ;
        this.router.navigate(['/cart']) ;
      } , err => {
        this.toastr.error('you have an error' + err) ;
      });
    } else {
      this.toastr.warning('this product is empty') ;
    }
  }
}
