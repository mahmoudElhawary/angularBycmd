import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  url = 'http://localhost:9191/' ;
  constructor(private http: HttpClient) { }

  getAllMessages(): Observable<any> {
    const headers = new HttpHeaders({'Access-Control-Allow-Origin': '*'}) ;
    return this.http.get(this.url + 'allMessages' , {headers}) ;
  }
  getAllBySenderId(id): Observable<any> {
    const headers = new HttpHeaders({'Access-Control-Allow-Origin': '*'}) ;
    return this.http.get(this.url + 'findAllBySenderId/' + id  , {headers}) ;
  }

  findAllByUserId(id): Observable<any> {
    const headers = new HttpHeaders({'Access-Control-Allow-Origin': '*'}) ;
    return this.http.get(this.url + 'findAllBySenderId/' + id  , {headers}) ;
  }
  sendMessage(data): Observable<any> {
    const headers = new HttpHeaders({'Access-Control-Allow-Origin': '*'}) ;
    return this.http.post(this.url + 'sendMessage' , data , {headers}) ;
  }
  getMessagesToThisSender(data): Observable<any> {
    const headers = new HttpHeaders({'Access-Control-Allow-Origin': '*'}) ;
    return this.http.post(this.url + 'getMessagesToThisSender' , data , {headers}) ;
  }
  getMessagesFromThisSender(data): Observable<any> {
    const headers = new HttpHeaders({'Access-Control-Allow-Origin': '*'}) ;
    return this.http.post(this.url + 'getMessagesFromThisSender' , data , {headers}) ;
  }
  deleteById(id): Observable<any> {
    const headers = new HttpHeaders({'Access-Control-Allow-Origin': '*'}) ;
    return this.http.get(this.url + 'deleteMessage/' + id  , {headers}) ;
  }
}
