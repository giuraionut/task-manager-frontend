import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChatMessage } from '../models/ChatMessage.model';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit, OnDestroy {
  constructor(public chatService: ChatService) {}

  ngOnInit(): void {
    this.chatService.openChatConnection();
  }

  ngOnDestroy(): void {
    this.chatService.closeChatConnection();
  }

  public sendMessage(name: string, content: string) {
    let message: ChatMessage = {};
    message.user = name;
    message.message = content;
    this.chatService.sendMessage(message);
  }
}
