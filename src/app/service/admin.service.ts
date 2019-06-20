import { Injectable } from '@angular/core';
import { LoginService } from './login.service';
import { UserService } from './user.service';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  loginUser: any = {};
  url = 'http://localhost:9191/' ;
  private _user: any;
  public get user(): any {
    return this._user;
  }
  constructor(
    private loginService: LoginService,
    private userService: UserService ,
    private http: HttpClient
  ) {
    this.http = http;
    this.loginService.isLoggedIn();
    this.loginUser = JSON.parse(localStorage.getItem('currentUser'));
    if (this.loginUser != null) {
      this.userService.getUser(this.loginUser.token).subscribe(
        (userData) => {
          this._user = userData.role;
          console.log(this.user) ;
        },
        err => {
          console.log(err);
        }
      );
    }
    console.log(this.user) ;
  }

  contactUsData(messageData): Observable<any> {
    const headers = new HttpHeaders({'Access-Control-Allow-Origin': '*'}) ;
    return this.http.post(this.url + 'setMessages' , messageData , {headers}) ;
  }
  getMessagesData(token: string): Observable<any> {
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + token}) ;
    return this.http.get(this.url + 'getMessages', {headers}) ;
  }
  createCategories(categoryDate): Observable<any> {
    const headers = new HttpHeaders({'Access-Control-Allow-Origin': '*'}) ;
    return this.http.post(this.url + 'saveCategoryMain' , categoryDate , {headers}) ;
  }
  UpdateCategories(categoryDate): Observable<any> {
    const headers = new HttpHeaders({'Access-Control-Allow-Origin': '*'}) ;
    return this.http.post(this.url + 'updateCategoryMain' , categoryDate , {headers}) ;
  }
  getCategories(token: string): Observable<any> {
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + token}) ;
    return this.http.get(this.url + 'allCategoriesMain', {headers}) ;
  }

  getCategory(categoryId): Observable<any> {
    const headers = new HttpHeaders({'Access-Control-Allow-Origin': '*'}) ;
    return this.http.get(this.url + 'getCategoryMain/' + categoryId, {headers}) ;
  }
  getMainCategories(token: string): Observable<any> {
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + token}) ;
    return this.http.get(this.url + 'allMainCategoriesMain', {headers}) ;
  }
  getSubCategories(token: string): Observable<any> {
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + token}) ;
    return this.http.get(this.url + 'allSubCategoriesMain', {headers}) ;
  }
  deleteCategories(categoryId): Observable<any> {
    const headers = new HttpHeaders({'Access-Control-Allow-Origin': '*'}) ;
    return this.http.delete(this.url + 'deleteCategory/' + categoryId, {headers}) ;
  }
}
