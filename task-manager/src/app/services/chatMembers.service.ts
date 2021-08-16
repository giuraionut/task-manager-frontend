import { Injectable } from '@angular/core';
import { ChatMessage } from '../models/ChatMessage.model';
import { ChatService } from './chatApi.service';
@Injectable({ providedIn: 'root' })
export class chatMembersService {
  constructor(private chatService: ChatService) {}

  public dbChats: Array<ChatMessage> = [];
  public partnerId: string = '';
  public getChat(): void {
    if (this.partnerId != null) {
      console.log(this.partnerId);
      this.dbChats = [];
      this.chatService
        .getChat(this.partnerId)
        .subscribe((chats: Array<ChatMessage>) => {
          this.dbChats.push(...chats);
        });
    }
  }
}
