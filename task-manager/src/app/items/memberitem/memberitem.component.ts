import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../models/User.model';
import { NotificationSocketService } from '../../services/notificationWebSocket.service';
import { TeamService } from '../../services/team.service';
import { UserService } from '../../services/user.service';
import { Notification } from '../../models/Notification.model';
import { chatMembersService } from '../../services/chatMembers.service';
@Component({
  selector: 'app-memberitem',
  templateUrl: './memberitem.component.html',
  styleUrls: ['./memberitem.component.scss'],
})
export class MemberitemComponent implements OnInit {
  @Input() members: Array<User> = [];
  @Input() management: Boolean = false;

  constructor(
    private teamService: TeamService,
    private userService: UserService,
    public notificationSocketService: NotificationSocketService,
    private chatMemberService: chatMembersService
  ) {}

  public user: User = {};
  ngOnInit(): void {
    this.userService.getUserInfo().subscribe((result: User) => {
      this.user = result;
    });
  }

  public select(member: User) {
    this.members.forEach((member) => {
      member.selected = false;
    });
    member.selected = true;
  }
  public getChat(id: string) {
    this.chatMemberService.partnerId = id;
    this.chatMemberService.getChat();
  }
  public kickTeamMember(id: string) {
    this.teamService.kickTeamMember(id).subscribe(() => {
      let notification: Notification = {};
      notification.content = 'Ai fost exclus din echipa';
      notification.receiverId = id;
      notification.senderId = this.user.id;
      const timestamp = new Date();
      timestamp.setHours(timestamp.getHours() + 3);
      notification.timestamp = timestamp;
      notification.type = 'kick';
      this.notificationSocketService.sendNotification(notification);
      this.members = this.members.filter((member) => member.id != id);
    });
  }
}
