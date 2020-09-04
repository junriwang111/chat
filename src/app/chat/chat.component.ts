import { Component, OnInit } from "@angular/core";
import { SocketService } from "../socket.service";

@Component({
  selector: "app-chat",
  templateUrl: "./chat.component.html",
  styleUrls: ["./chat.component.css"]
})
export class ChatComponent implements OnInit {
  messagecontent: string = "";
  messages: string[] = [];
  ioConnection: any;

  constructor(private socketService: SocketService) {}

  ngOnInit() {
    this.initIoConnection();
  }

  initIoConnection() {
    this.socketService.initSocket();

    this.ioConnection = this.socketService
      .onMessage()
      .subscribe((message: string) => {
        this.messages.push(message);
      });
  }

  chat() {
    // console.log(this.messagecontent);

    if (this.messagecontent) {
      this.socketService.send(this.messagecontent);
      this.messagecontent = null;
    } else {
      console.log("no message");
    }
  }
}