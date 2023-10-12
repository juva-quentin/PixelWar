import { Injectable } from '@angular/core';
import {webSocket} from "rxjs/webSocket";

@Injectable({
  providedIn: 'root'
})
export class WebSoketService {

  private socket = webSocket('ws://localhost:8080/pixelwar');

  send(message: any) {
    this.socket.next(message);
  }

  receive() {
    return this.socket.asObservable();
  }
}
