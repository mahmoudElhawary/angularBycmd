import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder,
  FormArray
} from '@angular/forms';
import { LoginService } from 'src/app/service/login.service';
import { AdminService } from 'src/app/service/admin.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-category-admin',
  templateUrl: './category-admin.component.html',
  styleUrls: ['./category-admin.component.css']
})
export class CategoryAdminComponent implements OnInit {
  categoryForm: FormGroup;
  categories$;
  selected;
  maninCategories$;
  subCategories$;
  loginUser: any = {};
  category: any = {};
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private loginService: LoginService,
    private adminService: AdminService,
    private toastr: ToastrService
  ) {
    this.loginService.isLoggedIn();
    this.loginUser = JSON.parse(localStorage.getItem('currentUser'));

    // category Form
    this.categoryForm = this.fb.group({
      mainCategoryName: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      subCategoryName: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ])
    });
  }

  ngOnInit() {
    this.getAllCategories();
    this.getMainCategories();
  }

  getAllCategories() {
    this.categories$ = this.adminService.getCategories(this.loginUser.token);
  }
  getMainCategories() {
    this.maninCategories$ = this.adminService.getMainCategories(
      this.loginUser.token
    );
  }
  createCategory(categ: FormGroup) {
    const categoryData = categ.value;
    if (categ.valid) {
      this.categories$ = this.adminService.createCategories(categoryData);
      this.toastr.success('this Category is created Successfully');
      this.categoryForm.reset();
    } else {
      this.toastr.error('There is an error on Creating this Category');
    }
  }
  updateCategory(categ: FormGroup) {
    const categoryData = categ.value;
    const formData = new FormData();
    formData.append('category', JSON.stringify(categoryData));
    formData.append('id', JSON.stringify(Number(this.category.categoryId)));
    if (categ.valid) {
      // categoryData.categoryId = this.category.categoryId ;
      // console.log(categoryData.categoryId) ;
      // console.log(this.category.categoryId) ;
      this.categories$ = this.adminService.UpdateCategories(formData);
      this.toastr.success('this Category is updated Successfully');
      // this.categoryForm.reset() ;
      // this.category = {} ;
    } else {
      this.toastr.error('There is an error on Creating this Category');
    }
  }
  Update(id) {
    if (id != null) {
      this.adminService.getCategory(id).subscribe(res => {
        this.category = res;
        this.categoryForm.patchValue(res);
      });
    }
  }
  delete(category) {
    if (category != null) {
      if (confirm('are you sure want to delete this product ?')) {
        this.categories$ = this.adminService.deleteCategories(
          category.categoryId
        );
      }
    }
  }
}
