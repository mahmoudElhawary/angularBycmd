import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  url = 'http://localhost:9191/' ;
  constructor(private http: HttpClient) {
    this.http = http ;
  }
  sliderProducts(): Observable<any> {
    const headers = new HttpHeaders({'Access-Control-Allow-Origin': '*'}) ;
    return this.http.get(this.url + 'sliderProducts' , {headers} ) ;
  }
  getProducts(): Observable<any> {
    const headers = new HttpHeaders({'Access-Control-Allow-Origin': '*'}) ;
    return this.http.get(this.url + 'allProducts' , {headers} ) ;
  }
  getProduct(id): Observable<any> {
    const headers = new HttpHeaders({'Access-Control-Allow-Origin': '*'}) ;
    return this.http.get(this.url + 'getProduct/' + id  , {headers}) ;
  }
  createProduct(data): Observable<any> {
    const headers = new HttpHeaders({'Access-Control-Allow-Origin': '*'}) ;
    return this.http.post(this.url + 'saveProduct' , data , {headers}) ;
  }
  updateProduct(data): Observable<any> {
    const headers = new HttpHeaders({'Access-Control-Allow-Origin': '*'}) ;
    return this.http.post(this.url + 'updateProduct' , data , {headers}) ;
  }
  deleteProduct(id): Observable<any> {
    const headers = new HttpHeaders({'Access-Control-Allow-Origin': '*'}) ;
    return this.http.delete(this.url + 'deleteProduct/' + id  , {headers}) ;
  }
  allProductsByMainCategory(mainName): Observable<any> {
    const headers = new HttpHeaders({'Access-Control-Allow-Origin': '*'}) ;
    return this.http.post(this.url + 'allProductsByMainCategory' , mainName , {headers}) ;
  }
  allProductsBySubCategory(subName): Observable<any> {
    const headers = new HttpHeaders({'Access-Control-Allow-Origin': '*'}) ;
    return this.http.post(this.url + 'allProductsBySubCategory' , subName , {headers}) ;
  }
  allProductsByCategory(categoryName): Observable<any> {
    const headers = new HttpHeaders({'Access-Control-Allow-Origin': '*'}) ;
    return this.http.post(this.url + 'allProductsByCategory' , categoryName , {headers}) ;
  }
  maxRatingProducts(): Observable<any> {
    const headers = new HttpHeaders({'Access-Control-Allow-Origin': '*'}) ;
    return this.http.get(this.url + 'maxRatingProducts' , {headers} ) ;
  }
  maxSellingProducts(): Observable<any> {
    const headers = new HttpHeaders({'Access-Control-Allow-Origin': '*'}) ;
    return this.http.get(this.url + 'maxSellingProducts' , {headers} ) ;
  }
  maxViewProducts(): Observable<any> {
    const headers = new HttpHeaders({'Access-Control-Allow-Origin': '*'}) ;
    return this.http.get(this.url + 'maxViewProducts' , {headers} ) ;
  }
  maxCommentProducts(): Observable<any> {
    const headers = new HttpHeaders({'Access-Control-Allow-Origin': '*'}) ;
    return this.http.get(this.url + 'maxCommentProducts' , {headers} ) ;
  }
  maxProductsPrice(): Observable<any> {
    const headers = new HttpHeaders({'Access-Control-Allow-Origin': '*'}) ;
    return this.http.get(this.url + 'maxProductsPrice' , {headers} ) ;
  }
  maxSearchingProducts(): Observable<any> {
    const headers = new HttpHeaders({'Access-Control-Allow-Origin': '*'}) ;
    return this.http.get(this.url + 'maxProductsSearch' , {headers} ) ;
  }
  newestProducts(): Observable<any> {
    const headers = new HttpHeaders({'Access-Control-Allow-Origin': '*'}) ;
    return this.http.get(this.url + 'newestProducts' , {headers} ) ;
  }
  commentProduct(data): Observable<any> {
    const headers = new HttpHeaders({'Access-Control-Allow-Origin': '*'}) ;
    return this.http.post(this.url + 'productComment' , data , {headers}) ;
  }
  productRating(data): Observable<any> {
    const headers = new HttpHeaders({'Access-Control-Allow-Origin': '*'}) ;
    return this.http.post(this.url + 'productRating' , data , {headers}) ;
  }
  getCommentProduct(id): Observable<any> {
    const headers = new HttpHeaders({'Access-Control-Allow-Origin': '*'}) ;
    return this.http.get(this.url + 'productComments/' + id, {headers}) ;
  }
}
