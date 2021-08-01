import { Injectable } from '@angular/core';
import { Message } from '../models/Message.model';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  webSocket!: WebSocket;
  message: Message[] = [];

  constructor() {}

  public openWebSocket() {
    this.webSocket = new WebSocket('ws://localhost:8080/chat');

    this.webSocket.onopen = (event) => {
      console.log('Open:', event);
    };

    this.webSocket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log(message);
      this.message.push(message);
    };

    this.webSocket.onclose = (event) => {
      console.log('Close:', event);
    };
  }

  public sendMessage(message: Message)
  {
    this.webSocket.send(JSON.stringify(message));

  }

  public closeWebSocket()
  {
    this.webSocket.close();
  }
}
