import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  url = 'http://localhost:9191/' ;

  constructor(private http: HttpClient) {
    this.http = http ;
  }

  getAllOrders(): Observable<any> {
    const headers = new HttpHeaders({'Access-Control-Allow-Origin': '*'}) ;
    return this.http.get(this.url + 'findAllOrders', {headers}) ;
  }
  getAllUserOrderByUserId(id): Observable<any> {
    const headers = new HttpHeaders({'Access-Control-Allow-Origin': '*'}) ;
    return this.http.get(this.url + 'findUserOrdersById/' + id , {headers}) ;
  }
  getUserOrderByUserId(id): Observable<any> {
    const headers = new HttpHeaders({'Access-Control-Allow-Origin': '*'}) ;
    return this.http.get(this.url + 'getUserOrderByUserId/' + id , {headers}) ;
  }
  setUserOrder(data): Observable<any> {
    const headers = new HttpHeaders({'Access-Control-Allow-Origin': '*'}) ;
    return this.http.post(this.url + 'setUserOrder' , data , {headers}) ;
  }
  getShippingAddressUserId(id): Observable<any> {
    const headers = new HttpHeaders({'Access-Control-Allow-Origin': '*'}) ;
    return this.http.get(this.url + 'getShippingAddressUserId/' + id , {headers}) ;
  }

}
