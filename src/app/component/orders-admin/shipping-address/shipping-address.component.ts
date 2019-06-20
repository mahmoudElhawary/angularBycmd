import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/service/cart.service';
import { Location } from '@angular/common';
import { OrderService } from 'src/app/service/order.service';

@Component({
  selector: 'app-shipping-address',
  templateUrl: './shipping-address.component.html',
  styleUrls: ['./shipping-address.component.css']
})
export class ShippingAddressComponent implements OnInit {

  id: number ;
  address$ ;
  constructor(
    private route: ActivatedRoute,
    private toastr: ToastrService ,
    private orderService: OrderService ,
    private location: Location) { }

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get('id') ;
    this.getShippingAddressByUser() ;
  }

  back() {
    this.location.back() ;
  }
  getShippingAddressByUser() {
    if (this.id) {
      this.address$ = this.orderService.getShippingAddressUserId(this.id) ;
    } else {
      this.toastr.error('this User Didnt Have Any Orders') ;
    }
  }
}
