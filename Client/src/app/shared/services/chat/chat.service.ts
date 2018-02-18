import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import * as io from 'socket.io-client';
import { User } from '../../models/User';

@Injectable()
export class ChatService {
  private socket;

  constructor(private http: Http) {
      this.socket = io();
  }

  Read(user:User,activeuser:User): Observable<Response> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    const body = { First: user, Second: activeuser};
    return this.http.post('/api/messages/read', body, options);
  }
  public SendMessage(envelope) {
      this.socket.emit('text-message', envelope);
  }
  public ReceiveMessage = () => {
    return Observable.create((observer) => {
        this.socket.on('text-message', (envelope) => {
            let user: User = JSON.parse(sessionStorage.getItem('user'));
            if (envelope.Receiver._id == user._id) { observer.next(envelope); }
        });
    });
  }
}