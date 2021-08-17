import { Injectable } from '@angular/core';
import { ChatMessage } from '../models/ChatMessage.model';
import { User } from '../models/User.model';
import { ChatService } from './chatApi.service';
import { ChatSocketService } from './chatWebSocket.service';
@Injectable({ providedIn: 'root' })
export class chatMembersService {
  constructor(
    private chatService: ChatService,
    private chatWebSocket: ChatSocketService
  ) {}

  public dbChats: Array<ChatMessage> = [];
  public partnerId: string = '';
  public user: User = {};
  public getChat(): void {
    if (this.partnerId != null) {
      console.log(this.partnerId);
      this.dbChats = [];
      this.chatWebSocket.chats = [];
      this.chatService
        .getChat(this.partnerId)
        .subscribe((chats: Array<ChatMessage>) => {
          this.dbChats.push(...chats);
        });
    }
  }
}
