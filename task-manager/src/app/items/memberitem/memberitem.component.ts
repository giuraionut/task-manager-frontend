import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../models/User.model';
import { NotificationSocketService } from '../../services/notificationWebSocket.service';
import { TeamService } from '../../services/team.service';
import { UserService } from '../../services/user.service';
import { Notification } from '../../models/Notification.model';
import { chatMembersService } from '../../services/chatMembers.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
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
    private chatMemberService: chatMembersService,
    public dialog: MatDialog
  ) {}

  public user: User = {};
  
  ngOnInit(): void {
    this.userService.getProfile().subscribe((result: User) => {
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

  public getPartnerInfo(id: string) {
    this.userService.getUserInfo(id).subscribe((user: User) => {
      this.chatMemberService.user = user;
    });
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

  public assignTask(username: string, id: string) {
    let dialogRef = this.dialog.open(DialogComponent, {
      data: {
        dialogType: 'newtask',
        username: username,
        responsibleId: id,
        teamId: this.user.teamId,
      },
    });
  }
}
