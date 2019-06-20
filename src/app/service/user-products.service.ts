import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserProductsService {

  url = 'http://localhost:9191/' ;
  constructor(private http: HttpClient) {
    this.http = http ;
  }
  getProducts(): Observable<any> {
    const headers = new HttpHeaders({'Access-Control-Allow-Origin': '*'}) ;
    return this.http.get(this.url + 'allUserProducts' , {headers} ) ;
  }
  getUserProductsById(id): Observable<any> {
    const headers = new HttpHeaders({'Access-Control-Allow-Origin': '*'}) ;
    return this.http.get(this.url + 'getUserProductsById/' + id  , {headers}) ;
  }
  getProduct(id): Observable<any> {
    const headers = new HttpHeaders({'Access-Control-Allow-Origin': '*'}) ;
    return this.http.get(this.url + 'getUserProduct/' + id  , {headers}) ;
  }
  deleteProduct(id): Observable<any> {
    const headers = new HttpHeaders({'Access-Control-Allow-Origin': '*'}) ;
    return this.http.delete('http://localhost:9191/deleteUserProduct/' + id  , {headers}) ;
  }
  createProducts(productDate): Observable<any> {
    const headers = new HttpHeaders({'Access-Control-Allow-Origin': '*'}) ;
    return this.http.post('http://localhost:9191/saveUserProduct' , productDate , {headers}) ;
  }
  updateProduct(productDate): Observable<any> {
    const headers = new HttpHeaders({'Access-Control-Allow-Origin': '*'}) ;
    return this.http.post('http://localhost:9191/updateUserProduct' , productDate , {headers}) ;
  }
  getProductByUserId(id) {
    const headers = new HttpHeaders({'Access-Control-Allow-Origin': '*'}) ;
    return this.http.get('http://localhost:9191/getUserProductsById/' + id , {headers} ) ;
  }
  allProductsByMainCategory(mainName): Observable<any> {
    const headers = new HttpHeaders({'Access-Control-Allow-Origin': '*'}) ;
    return this.http.post(this.url + 'allUserProductsByMainCategory' , mainName , {headers}) ;
  }
  allProductsBySubCategory(subName): Observable<any> {
    const headers = new HttpHeaders({'Access-Control-Allow-Origin': '*'}) ;
    return this.http.post(this.url + 'allUserProductsBySubCategory' , subName , {headers}) ;
  }
  allProductsByCategory(categoryName): Observable<any> {
    const headers = new HttpHeaders({'Access-Control-Allow-Origin': '*'}) ;
    return this.http.post(this.url + 'allUserProductsByCategory' , categoryName , {headers}) ;
  }
  maxRatingUserProducts(): Observable<any> {
    const headers = new HttpHeaders({'Access-Control-Allow-Origin': '*'}) ;
    return this.http.get(this.url + 'maxRatingUserProducts' , {headers} ) ;
  }
  maxSellingUserProducts(): Observable<any> {
    const headers = new HttpHeaders({'Access-Control-Allow-Origin': '*'}) ;
    return this.http.get(this.url + 'maxSellingUserProducts' , {headers} ) ;
  }
  maxViewUserProducts(): Observable<any> {
    const headers = new HttpHeaders({'Access-Control-Allow-Origin': '*'}) ;
    return this.http.get(this.url + 'maxViewUserProducts' , {headers} ) ;
  }
  maxUserCommentProducts(): Observable<any> {
    const headers = new HttpHeaders({'Access-Control-Allow-Origin': '*'}) ;
    return this.http.get(this.url + 'maxUserCommentProducts' , {headers} ) ;
  }
  newestUserProducts(): Observable<any> {
    const headers = new HttpHeaders({'Access-Control-Allow-Origin': '*'}) ;
    return this.http.get(this.url + 'newestUserProducts' , {headers} ) ;
  }
  userProductComment(data): Observable<any> {
    const headers = new HttpHeaders({'Access-Control-Allow-Origin': '*'}) ;
    return this.http.post(this.url + 'userProductComment' , data , {headers}) ;
  }
  userProductRating(data): Observable<any> {
    const headers = new HttpHeaders({'Access-Control-Allow-Origin': '*'}) ;
    return this.http.post(this.url + 'userProductRating' , data , {headers}) ;
  }
  userProductComments(id): Observable<any> {
    const headers = new HttpHeaders({'Access-Control-Allow-Origin': '*'}) ;
    return this.http.get(this.url + 'userProductComments/' + id, {headers}) ;
  }

}
