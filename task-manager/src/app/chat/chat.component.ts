import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChatMessage } from '../models/ChatMessage.model';
import { User } from '../models/User.model';
import { chatMembersService } from '../services/chatMembers.service';
import { ChatSocketService } from '../services/chatWebSocket.service';
import { UserService } from '../services/user.service';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit, OnDestroy {
  constructor(
    public chatSocketService: ChatSocketService,
    private userService: UserService,
    public chatMemberService: chatMembersService
  ) {}
  private user: User = {};
  public partner: User = {};
  ngOnInit(): void {
    this.userService.getProfile().subscribe((user) => {
      this.user = user;
    });

    this.chatSocketService.openChatConnection();
  }

  ngOnDestroy(): void {
    this.chatSocketService.closeChatConnection();
  }

  getSender(chatMessage: ChatMessage) {
    if (chatMessage.senderId != this.user.id) {
      return this.chatMemberService.user.username;
    } else {
      return 'Eu';
    }
  }

  public getPartnerInfo(id: string) {
    console.log(id);
    this.userService.getUserInfo(id).subscribe((user: User) => {
      this.partner = user;
      console.log(this.partner);
    });
  }
  public sendMessage(content: string) {
    let message: ChatMessage = {};
    message.senderId = this.user.id;
    message.message = content;
    message.receiverId = this.chatMemberService.partnerId;
    const timestamp = new Date();
    timestamp.setHours(timestamp.getHours() + 3);
    message.timestamp = timestamp;
    this.chatSocketService.sendMessage(message);
  }
}
