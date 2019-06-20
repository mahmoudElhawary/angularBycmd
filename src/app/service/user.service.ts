import { Injectable, OnInit, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = 'http://localhost:9191/' ;
  constructor(private http: HttpClient) {
    this.http = http ;
  }

  signup(user): Observable<any> {
    const headers = new HttpHeaders({'Access-Control-Allow-Origin' : '*'}) ;
    return this.http.post(this.url + 'signup' , user , {headers}) ;
  }
  update(user): Observable<any> {
    const headers = new HttpHeaders({'Access-Control-Allow-Origin' : '*'}) ;
    return this.http.post(this.url + 'update' , user , {headers}) ;
  }
  updatePhoto(user): Observable<any> {
    const headers = new HttpHeaders({'Access-Control-Allow-Origin' : '*'}) ;
    return this.http.post(this.url + 'updatePhoto' , user , {headers}) ;
  }
  loginUsers(user): Observable<any> {
    const headers = new HttpHeaders({'Access-Control-Allow-Origin': '*'}) ;
    return this.http.post(this.url + 'login' , user , {headers}) ;
  }
  getUserAddress(user): Observable<any> {
    const headers = new HttpHeaders({'Access-Control-Allow-Origin': '*'}) ;
    return this.http.post(this.url + 'getUserAddress' , user , {headers}) ;
  }
  getUsers(token: string): Observable<any> {
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + token}) ;
    return this.http.get(this.url + 'getUsers' , {headers}) ;
  }
  getUser(token: string): Observable<any> {
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + token}) ;
    return this.http.get(this.url + 'getUser' , {headers}) ;
  }
  getUserById(id): Observable<any> {
    const headers = new HttpHeaders({'Access-Control-Allow-Origin': '*'}) ;
    return this.http.get(this.url + 'findUserById/' + id , {headers}) ;
  }
}
