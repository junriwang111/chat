import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import * as io from "socket.io-client";
const URL = "http://localhost:3000";

@Injectable({
  providedIn: "root"
})
export class SocketService {
  private socket;

  constructor() {}

  public initSocket(): void {
    this.socket = io(URL);
  }

  public send(message: string): void {
    // console.log("send:" + message);
    this.socket.emit("message", message);
  }

  public onMessage(): Observable<any> {
    const EE = new Observable(observer => {
      this.socket.on("message", (data: string) => {
        observer.next(data);
      });
    });
    return EE;
  }
}
