import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  url = 'http://localhost:9191/' ;

  constructor(private http: HttpClient) {
    this.http = http ;
  }

  getRequiredProduct(data): Observable<any> {
    const headers = new HttpHeaders({'Access-Control-Allow-Origin': '*'}) ;
    return this.http.post(this.url + 'getRequiredProduct' , data , {headers}) ;
  }
  searchForOneProduct(data): Observable<any> {
    const headers = new HttpHeaders({'Access-Control-Allow-Origin': '*'}) ;
    return this.http.post(this.url + 'searchForOneProduct' , data , {headers}) ;
  }
  getRequiredProductsName(data): Observable<any> {
    const headers = new HttpHeaders({'Access-Control-Allow-Origin': '*'}) ;
    return this.http.post(this.url + 'getRequiredProductsName' , data , {headers}) ;
  }
  searchAllProductsByMainCategory(categoryName): Observable<any> {
    const headers = new HttpHeaders({'Access-Control-Allow-Origin': '*'}) ;
    return this.http.post(this.url + 'searchAllProductsByMainCategory' , categoryName , {headers}) ;
  }
  SearchAllProductsBySubCategory(categoryName): Observable<any> {
    const headers = new HttpHeaders({'Access-Control-Allow-Origin': '*'}) ;
    return this.http.post(this.url + 'SearchAllProductsBySubCategory' , categoryName , {headers}) ;
  }
}
