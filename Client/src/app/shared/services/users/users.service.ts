import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response, ResponseContentType } from '@angular/http';
import { Observable } from 'rxjs/Rx'
import { User } from "../../models/User";

@Injectable()
export class UsersService {

  constructor(private http: Http) { }

  Create(user:User): Observable<Response> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    const body = {user: user};
    return this.http.post('/api/users/create', body, options);
  }
  Read(): Observable<Response> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    const body = { user: null};
    return this.http.post('/api/users/read', body, options);
  }
  FindById(user:User): Observable<Response> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    const body = { user: user};
    return this.http.post('/api/users/findbyid', body, options);
  }
  Login(user:User): Observable<Response> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    const body = { user: user};
    return this.http.post('/api/users/login', body, options);
  }
  Update(user: User): Observable<Response> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    const body = {user: user};
    return this.http.post('/api/users/update', body, options);
  }
  Delete(user:User): Observable<Response> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    const body = {userid: user._id};
    return this.http.post('/api/users/delete', body, options);
  }
  Print() {
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers, responseType: ResponseContentType.Blob });
    const body = {report: null};
    return this.http.post('/api/report/members', body, options);
  }
}