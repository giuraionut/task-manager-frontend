import { Injectable } from '@angular/core';
import { ChatMessage } from '../models/ChatMessage.model';
import { User } from '../models/User.model';
import { ChatService } from './chatApi.service';
import { UserService } from './user.service';
@Injectable({
  providedIn: 'root',
})
export class ChatSocketService {

  webSocket!: WebSocket;
  chats: ChatMessage[] = [];

  constructor(
    private chatService: ChatService,
    private userService: UserService
  ) {}

  public openChatConnection() {
    this.webSocket = new WebSocket('ws://localhost:8080/chat');

    this.webSocket.onopen = (event) => {
      console.log('Open:', event);
    };

    this.webSocket.onmessage = (event) => {
      const chat: ChatMessage = JSON.parse(event.data);

      this.userService.getProfile().subscribe((user: User) => {
        if (user.id === chat.receiverId || user.id === chat.senderId) {
          this.chats.push(chat);
        }
      });
    };

    //---------------------------------------------------------------------
    this.webSocket.onclose = (event) => {
      console.log('Close:', event);
    };
  }

  public sendMessage(chat: ChatMessage) {
    this.webSocket.send(JSON.stringify(chat));
    this.chatService.saveChat(chat).subscribe();
  }

  public closeChatConnection() {
    this.webSocket.close();
  }
}
