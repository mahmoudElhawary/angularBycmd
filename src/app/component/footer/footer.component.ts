import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/service/products.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  seelinproducts$ ;
  searchedProducts$ ;
  loginUser: any = {};
  constructor(private productService: ProductsService,
    private router: Router,
    private loginService: LoginService ,
    private toastr: ToastrService) {
      this.loginService.isLoggedIn();
      this.loginUser = JSON.parse(localStorage.getItem('currentUser'));
    }

  ngOnInit() {
    this.maxSellingProducts();
    this.maxSearchingProducts() ;
  }

  view(product) {
    this.router.navigate(['product/' + product]);
    this.toastr.info('Just loaded your selected product for you.');
  }
  maxSellingProducts() {
    this.seelinproducts$ = this.productService.maxSellingProducts();
  }
  maxSearchingProducts() {
    this.searchedProducts$ = this.productService.maxSearchingProducts();
  }
}
