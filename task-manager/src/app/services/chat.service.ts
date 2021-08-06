import { Injectable } from '@angular/core';
import { ChatMessage } from '../models/ChatMessage.model';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  webSocket!: WebSocket;
  message: ChatMessage[] = [];

  constructor() {}

  public openChatConnection() {
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

  public sendMessage(message: ChatMessage) {
    this.webSocket.send(JSON.stringify(message));
  }

  public closeChatConnection() {
    this.webSocket.close();
  }
}
