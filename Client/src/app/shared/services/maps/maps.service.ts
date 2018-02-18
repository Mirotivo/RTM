import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Location } from '../../models/Location';

@Injectable()
export class MapsService {

  constructor(private http: Http) { }
  
    Create(location:Location): Observable<Response> {
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
      const body = {location: location};
      return this.http.post('/api/locations/create', body, options);
    }
    Read(): Observable<Response> {
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
      const body = { location: null};
      return this.http.post('/api/locations/read', body, options);
    }
}
