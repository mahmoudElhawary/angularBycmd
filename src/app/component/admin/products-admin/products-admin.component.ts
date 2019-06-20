import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  FormControl,
  Validators,
  FormBuilder,
  FormGroup
} from '@angular/forms';
import { LoginService } from 'src/app/service/login.service';
import { UserService } from 'src/app/service/user.service';
import { AdminService } from 'src/app/service/admin.service';
import { Category } from 'src/app/config/category';
import { CategoryService } from 'src/app/service/category.service';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { ProductsService } from 'src/app/service/products.service';

@Component({
  selector: 'app-products-admin',
  templateUrl: './products-admin.component.html',
  styleUrls: ['./products-admin.component.css']
})
export class ProductsAdminComponent implements OnInit {
  users$;
  productForm: FormGroup;
  loginUser: any = {};
  product: any = {};
  products: any = [];
  categories$;
  subCategories$;
  mainCategories$;
  selectedOption;
  productFile: any = File;
  allFiles: any = [];
  update = false ;
  constructor(
    private loginService: LoginService,
    private fb: FormBuilder,
    private productService: ProductsService,
    private adminService: AdminService,
    private categoryService: CategoryService,
    private toastr: ToastrService
  ) {
    this.loginService.isLoggedIn();
    this.loginUser = JSON.parse(localStorage.getItem('currentUser'));
    // product Form
    this.productForm = this.fb.group({
      productName: new FormControl('', [Validators.required]),
      color: new FormControl(''),
      size: new FormControl(''),
      isSlider: new FormControl(''),
      defaultSize: new FormControl(''),
      productSummary: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      productDescription: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      productPrice: new FormControl(''),
      productCondition: new FormControl(''),
      quantity: new FormControl(''),
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
    this.getAllProducts();
    this.getCategories();
    this.getMainCategories();
    if (this.selectedOption != null) {
      this.getSubCategories(this.selectedOption);
    }
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
  saveProduct(product: FormGroup) {
    const productData = product.value;
    const formData = new FormData();
    if (product.valid) {
      formData.append('product', JSON.stringify(productData));
      formData.append('productFile', this.productFile);
      this.productService.createProduct(formData).subscribe(res => {
        this.products = res;
        this.toastr.success('this Product Created Successfully') ;
        this.productForm.reset() ;
      });
    }
  }
  updateProduct(productForm) {
    if (this.product.productId) {
      const productData = productForm.value;
      const formData = new FormData();
      if (productForm.valid) {
        formData.append('product', JSON.stringify(productData));
        formData.append('productFile', this.productFile);
        formData.append('id', JSON.stringify(Number(this.product.productId)));
        this.productService.updateProduct(formData).subscribe(res => {
          this.products = res;
          this.toastr.success('this Product Updated Successfully') ;
          this.productForm.reset() ;
          this.product = {} ;
          setTimeout(() => {
            this.update = true ;
          }, 9000);
          this.update = false ;
        });
      }
    }
  }
  SetFormValue(id) {
    if (id) {
      this.productService.getProduct(id).subscribe(res => {
        this.product = res ;
        this.productForm.patchValue(res) ;
        this.update = true ;
        this.toastr.success('Product Data is Loaded Successfully') ;
      });
    } else {
      this.toastr.error('ther is an error on Loading Product Data on Form') ;
    }
  }
  deleteProduct(product) {
    if (product != null) {
      if (confirm('are you sure want to delete this product ?')) {
        this.productService.deleteProduct(product.productId).subscribe(res => {
          this.products = res;
        });
        this.toastr.warning('You are deleteing a product.', 'Alert!');
      }
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
    if (mainName != null) {
      this.subCategories$ = this.categoryService.getSubCategoriesByMainName(
        mainName
      );
    } else {
      this.toastr.error('you have an error');
    }
  }
  getAllProducts() {
    this.productService.getProducts().subscribe(res => {
      this.products = res;
    });
  }
  getAllCategories() {
    this.categories$ = this.adminService.getCategories(this.loginUser.token);
  }
}
