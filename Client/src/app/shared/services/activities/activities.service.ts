import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx'
import { Activity } from "../../models/Activity";

@Injectable()
export class ActivitiesService {

  constructor(private http: Http) { }

  Read(): Observable<Response> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    const body = { activity: null};
    return this.http.post('/api/activities/read', body, options);
  }
  Delete(activity:Activity): Observable<Response> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    const body = {activityid: activity._id};
    return this.http.post('/api/activities/delete', body, options);
  }
}