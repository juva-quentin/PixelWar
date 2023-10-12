import { Injectable } from '@angular/core';
import {webSocket, WebSocketSubject} from "rxjs/webSocket";
import {catchError, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private socket$: WebSocketSubject<any>;

  constructor() {
    this.socket$ = webSocket('ws://localhost:8080/pixelwar');
    this.socket$.pipe(
      catchError((error) => {
        console.error('WebSocket error:', error);
        return throwError(error);
      })
    ).subscribe();
  }

  send(message: any) {
    console.log(message)
    this.socket$.next(message);
  }

  receive() {
    return this.socket$.asObservable();
  }
}
