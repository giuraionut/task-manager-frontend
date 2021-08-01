import { Component, OnDestroy, OnInit } from '@angular/core';
import { Message } from '../models/Message.model';
import { WebsocketService } from '../services/websocket.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit, OnDestroy {
  constructor(public webSocketService: WebsocketService) {}

  ngOnInit(): void {
    this.webSocketService.openWebSocket();
  }

  ngOnDestroy(): void {
    this.webSocketService.closeWebSocket();
  }

  public sendMessage(name: string, content: string) {
    let message: Message = {};
    message.user = name;
    message.message = content;
    this.webSocketService.sendMessage(message);
  }




}
