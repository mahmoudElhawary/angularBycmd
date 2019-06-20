import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) {
    this.http = http ;
  }

  getAllCategories(): Observable<any> {
    const headers = new HttpHeaders({'Access-Control-Allow-Origin': '*'}) ;
    return this.http.get('http://localhost:9191/allCategoriesMain' , {headers} ) ;
  }
  getMainCategories(): Observable<any> {
    const headers = new HttpHeaders({'Access-Control-Allow-Origin': '*'}) ;
    return this.http.get('http://localhost:9191/allMainCategoriesMain' , {headers} ) ;
  }
  getSubCategories(): Observable<any> {
    const headers = new HttpHeaders({'Access-Control-Allow-Origin': '*'}) ;
    return this.http.get('http://localhost:9191/allSubCategoriesMain' , {headers} ) ;
  }
  getSubCategoriesByMainName(mainName): Observable<any> {
    const headers = new HttpHeaders({'Access-Control-Allow-Origin': '*'}) ;
    return this.http.post('http://localhost:9191/SubCategoriesByMainNameMain' , mainName , {headers}) ;
  }
  deleteCategories(categoryId): Observable<any> {
    const headers = new HttpHeaders({'Access-Control-Allow-Origin': '*'}) ;
    return this.http.delete('http://localhost:9191/deleteCategoryMain/' + categoryId, {headers}) ;
  }
}
