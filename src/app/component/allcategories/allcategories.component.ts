import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/service/login.service';
import { UserService } from 'src/app/service/user.service';
import { CategoryService } from 'src/app/service/category.service';
import { ProductsService } from 'src/app/service/products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-allcategories',
  templateUrl: './allcategories.component.html',
  styleUrls: ['./allcategories.component.css']
})
export class AllcategoriesComponent implements OnInit {
  loginUser: any = {};
  users$;
  subCategories$;
  mainCategories$;
  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private loginService: LoginService,
    private userService: UserService
  ) {
    this.loginService.isLoggedIn();
    this.loginUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    this.users$ = this.userService.getUsers(this.loginUser.token);
    this.getMainCategories();
  }
  getMainCategories() {
    this.mainCategories$ = this.categoryService.getMainCategories();
  }
  getSubs(mainName) {
    this.subCategories$ = this.categoryService
      .getSubCategoriesByMainName(mainName);
  }
  viewByMainCategory(CategoryName) {
    this.router.navigate(['products/' + CategoryName]);
  }
  viewBySubCategory(subCategoryName) {
    this.router.navigate(['products/' + subCategoryName]);
  }
}
