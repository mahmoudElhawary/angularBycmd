import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormControl,
  FormBuilder
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/service/login.service';
import { UserService } from 'src/app/service/user.service';
import { NgbTabsetConfig } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/service/category.service';
import { UserProductsService } from 'src/app/service/user-products.service';
import { MessageService } from 'src/app/service/message.service';
import { OrderService } from 'src/app/service/order.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit, OnChanges {
  productForm: FormGroup;
  loginUser: any = {};
  products: any = [];
  categories$;
  subCategories$;
  mainCategories$;
  selectedOption;
  productFile: any = File;
  userFile: any = File;
  allFiles: any = [];
  user: any = {};
  product: any = {};
  page;
  update = false;
  userMessages$ ;
  orders$ ;
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private userProductService: UserProductsService,
    private loginService: LoginService,
    private router: Router,
    private route: ActivatedRoute,
    private config: NgbTabsetConfig,
    private toastr: ToastrService,
    private categoryService: CategoryService ,
    private messageService: MessageService ,
    private orderService: OrderService
  ) {
    this.config.justify = 'center';
    config.type = 'pills';
    this.loginService.isLoggedIn();
    this.loginUser = JSON.parse(localStorage.getItem('currentUser'));
    // product Form
    this.productForm = this.fb.group({
      productName: new FormControl('', [Validators.required]),
      color: new FormControl(''),
      size: new FormControl(''),
      defaultSize: new FormControl(''),
      productSummary: new FormControl('', [Validators.minLength(3)]),
      productDescription: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      // productViews: new FormControl('', [Validators.required]),
      productPrice: new FormControl('', [Validators.required]),
      productCondition: new FormControl('', [Validators.required]),
      quantity: new FormControl('', [Validators.required]),
      productCategory: new FormGroup({
        mainCategoryName: new FormControl('', [Validators.required]),
        subCategoryName: new FormControl('', [Validators.required])
      })
    });
  }

  ngOnInit() {
    if (this.loginUser.token) {
      this.userService.getUser(this.loginUser.token).subscribe(userData => {
        this.user = userData;
      });
    }
    this.getCategories();
    this.getMainCategories();
    if (this.selectedOption != null) {
      this.getSubCategories(this.selectedOption);
    }
    this.getProductsById();
    this.getUserMessages() ;
  }
  ngOnChanges() {
    if (this.loginUser.token) {
      this.userService.getUser(this.loginUser.token).subscribe(userData => {
        this.user = userData;
      });
    }
    this.getCategories();
    this.getMainCategories();
    if (this.selectedOption != null) {
      this.getSubCategories(this.selectedOption);
    }
    this.getProductsById();
    this.getUserMessages() ;
    this.getUserOrders() ;
  }

  getUserOrders() {
    if (this.loginUser.user) {
      this.orders$ = this.orderService.getUserOrderByUserId(this.loginUser.user.id) ;
    } else {
      this.toastr.error('there is now user founded') ;
    }
  }
  getUserMessages() {
    this.userMessages$ = this.messageService.findAllByUserId(
      this.loginUser.user.id
    );
  }

  getProductsById() {
    if (this.loginUser != null) {
      console.log(this.loginUser.user.id);
      this.userProductService.getUserProductsById(this.loginUser.user.id).subscribe(res => {
        this.products = res ;
      });
    } else {
      this.toastr.warning('you must login first');
    }
  }
  deleteProduct(id) {
    if (id != null) {
      if (confirm('Are you sure want to delete this Product !?')) {
        this.userProductService.deleteProduct(id).subscribe(
          res => {
            this.toastr.success('you Are Successfully Deleted this product');
            this.userProductService.getUserProductsById(
              this.loginUser.user.id
            );
          },
          err => {
            this.toastr.error('you are having an error');
          }
        );
      } else {
        this.toastr.info('ohh !! this product canceled to delete');
      }
    } else {
      this.toastr.error('you are having an error');
    }
  }
  getProduct(id) {
    if (id != null) {
      this.router.navigate(['userProduct/' + id]);
    } else {
      this.toastr.error('you are having an error');
    }
  }
  getSelectedOptionText(event) {
    this.selectedOption = event.target.options[event.target.selectedIndex].text;
    this.getSubCategories(this.selectedOption);
  }
  getCategories() {
    this.categories$ = this.categoryService.getAllCategories();
  }
  getMainCategories() {
    this.mainCategories$ = this.categoryService.getMainCategories();
  }
  getSubCategories(mainName) {
    this.subCategories$ = this.categoryService.getSubCategoriesByMainName(
      mainName
    );
  }
  onSelectFile(event) {
    // profile image
    const file = event.target.files[0];
    // multiple file
    const files = event.target.files;
    for (let index = 0; index < files.length; index++) {
      this.allFiles.push(files[index]);
      // console.log(files[index]) ;
    }
    this.productFile = file;
    this.toastr.info('product photo is loaded successfully');
    // console.log(file);
  }
  onSelectUserFile(event) {
    // profile image
    const file = event.target.files[0];
    // multiple file
    const files = event.target.files;
    for (let index = 0; index < files.length; index++) {
      this.allFiles.push(files[index]);
      // console.log(files[index]) ;
    }
    this.userFile = file;
    this.toastr.info('product photo is loaded successfully');
    // console.log(file);
  }
  updateImage(id) {
    if (id) {
      const formData = new FormData();
      formData.append('userFile', this.userFile);
      formData.append('id', JSON.stringify(Number(id)));
      this.userService.updatePhoto(formData).subscribe(res => {
        this.user = res;
      });
    } else {
      this.toastr.error('you Have an error on Updating Your Photo');
    }
  }
  saveProduct(product: FormGroup) {
    console.log(product.value);
    const productData = product.value;
    productData.userClass = this.loginUser.user;
    const formData = new FormData();
    if (product.valid) {
      formData.append('product', JSON.stringify(productData));
      formData.append('user', JSON.stringify(this.loginUser.user));
      formData.append('productFile', this.productFile);
      this.userProductService
        .createProducts(formData)
        .subscribe(
          data => {
            this.products = data ;
            this.toastr.success('You are create an product!', 'Success!');
          },
          err => {
            console.log(err);
            this.toastr.error('you have an error', 'Oops!');
          }
        );
    }
  }
  SetFormValue(id) {
    if (id) {
      this.userProductService.getProduct(id).subscribe(res => {
        this.product = res;
        this.productForm.patchValue(res);
        this.update = true;
        this.toastr.success('Product Data is Loaded Successfully');
      });
    } else {
      this.toastr.error('ther is an error on Loading Product Data on Form');
    }
  }
  showMessages() {
    this.router.navigate(['account/messages/messages'] , {relativeTo: this.route}) ;
    this.toastr.info('you are show an products');
  }
  updateProduct(productForm) {
    if (this.product.userProductsId) {
      const productData = productForm.value;
      const formData = new FormData();
      if (productForm.valid) {
        formData.append('product', JSON.stringify(productData));
        formData.append('productFile', this.productFile);
        formData.append('user', JSON.stringify(this.loginUser.user));
        formData.append(
          'id',
          JSON.stringify(Number(this.product.userProductsId))
        );
        this.userProductService
          .updateProduct(formData)
          .subscribe(res => {
            this.toastr.success('this Product Updated Successfully');
            this.products = res ;
            this.productForm.reset();
            this.product = {};
            setTimeout(() => {
              this.update = true;
            }, 9000);
            this.update = false;
          });
      }
    }
  }
}
