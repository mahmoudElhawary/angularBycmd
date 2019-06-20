import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/service/cart.service';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';

@Component({
  selector: 'app-orders-details',
  templateUrl: './orders-details.component.html',
  styleUrls: ['./orders-details.component.css']
})
export class OrdersDetailsComponent implements OnInit {

  id: number ;
  loginUser: any = {};
  AllData: object[];
  carts: object[];
  allCarts: any[];
  prodcts = new Array();
  total = 0;
  constructor(
    private route: ActivatedRoute,
    private toastr: ToastrService ,
    private cartService: CartService ,
    private location: Location) { }

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get('id') ;
    this.getCartByUser() ;
  }

  getCartByUser() {
    if (this.id) {
      this.cartService.getCartByUserId(this.id).subscribe(
        response => {
          this.AllData = response as object[];
          this.AllData.map(cartss => {
            this.carts = cartss['cartItems'];
            this.carts.forEach(items => {
              this.prodcts.push(items['product']);
              this.total = this.total + items['totalPriceDouble'];
            });
          });
        },
        err => {
          this.toastr.error('there is an error happend', 'Oops!');
        }
      );
    } else {
      this.toastr.error('this User Didnt Have Any Orders') ;
    }
  }
  back() {
    this.location.back() ;
  }
}
