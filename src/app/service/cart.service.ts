import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  url = 'http://localhost:9191/' ;
  constructor(private http: HttpClient) {
    this.http = http ;
  }

  getAllCarts(): Observable<any> {
    const headers = new HttpHeaders({'Access-Control-Allow-Origin': '*'}) ;
    return this.http.get(this.url + 'getAllCarts' , {headers} ) ;
  }
  saveCart(data): Observable<any> {
    const headers = new HttpHeaders({'Access-Control-Allow-Origin': '*'}) ;
    return this.http.post(this.url + 'saveCart', data , {headers} ) ;
  }
  updateCart(data): Observable<any> {
    const headers = new HttpHeaders({'Access-Control-Allow-Origin': '*'}) ;
    return this.http.post(this.url + 'updateCart', data , {headers} ) ;
  }
  saveUserProductsCart(data): Observable<any> {
    const headers = new HttpHeaders({'Access-Control-Allow-Origin': '*'}) ;
    return this.http.post(this.url + 'saveUserProductsCart', data , {headers} ) ;
  }
  getAllUserCarts(User): Observable<any> {
    const headers = new HttpHeaders({'Access-Control-Allow-Origin': '*'}) ;
    return this.http.post(this.url + 'getAllUserCarts', User , {headers} ) ;
  }
  getUserCart(User): Observable<any> {
    const headers = new HttpHeaders({'Access-Control-Allow-Origin': '*'}) ;
    return this.http.post(this.url + 'getUserCart', User , {headers} ) ;
  }
  getCartByUserId(id): Observable<any> {
    const headers = new HttpHeaders({'Access-Control-Allow-Origin': '*'}) ;
    return this.http.get(this.url + 'getCartByUserId/' + id , {headers} ) ;
  }
  deleteCartByProduct(product): Observable<any> {
    const headers = new HttpHeaders({'Access-Control-Allow-Origin': '*'}) ;
    return this.http.post(this.url + 'deleteCartByProduct', product , {headers} ) ;
  }
  deleteFromCart(product): Observable<any> {
    const headers = new HttpHeaders({'Access-Control-Allow-Origin': '*'}) ;
    return this.http.post(this.url + 'deleteFromCart', product , {headers} ) ;
  }
}
