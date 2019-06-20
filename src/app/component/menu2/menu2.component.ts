import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { CategoryService } from 'src/app/service/category.service';
import { ProductsService } from 'src/app/service/products.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-menu2',
  templateUrl: './menu2.component.html',
  styleUrls: ['./menu2.component.css']
})
export class Menu2Component implements OnInit , OnChanges {
  categories$;
  subCategories$;
  mainCategories$;
  selectedOption;
  products$;
  constructor(
    private categoryService: CategoryService,
    private productService: ProductsService,
    private toastr: ToastrService ,
    private router: Router
  ) {}

  ngOnInit() {
    this.getCategories();
    this.getMainCategories();
  }

  ngOnChanges() {
    this.getCategories();
    this.getMainCategories();
  }
  viewBySubCategory(subCategoryName) {
    if (subCategoryName != null) {
      this.router.navigate(['products/' + subCategoryName]) ;
    } else {
      this.toastr.error('no category comming') ;
    }
    // location.reload() ;
  }
  getMyProducts(category) {
    if (category != null) {
      this.products$ = this.productService.allProductsBySubCategory(category);
    } else {
      this.toastr.error('no category comming') ;
    }
  }
  getSelectedOptionText(event) {
    if (event != null) {
      this.selectedOption = event.target.options[event.target.selectedIndex].text;
      this.getSubs(this.selectedOption);
    } else {
      this.toastr.error('no category comming') ;
    }
  }
  getCategories() {
   this.categories$ = this.categoryService.getAllCategories();
  }
  getMainCategories() {
      this.mainCategories$ = this.categoryService.getMainCategories();
  }
  getSubs(mainName) {
    if (mainName != null) {
      this.subCategories$ = this.categoryService
      .getSubCategoriesByMainName(mainName);
    } else {
      this.toastr.error('no category comming') ;
    }
  }
}
