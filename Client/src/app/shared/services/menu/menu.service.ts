import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

@Injectable()
export class MenuService {

  constructor(private http: Http) { }
  Read(): Observable<Response> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    const body = { location: null};
    return this.http.post('/api/categories/read', body, options);
  }
}
