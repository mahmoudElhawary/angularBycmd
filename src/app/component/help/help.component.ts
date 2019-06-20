import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductsService } from 'src/app/service/products.service';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css']
})
export class HelpComponent implements OnInit {
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
