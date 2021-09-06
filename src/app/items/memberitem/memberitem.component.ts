import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '../../models/User.model';
import { NotificationSocketService } from '../../services/notificationWebSocket.service';
import { TeamService } from '../../services/team.service';
import { UserService } from '../../services/user.service';
import { Notification } from '../../models/Notification.model';
import { chatMembersService } from '../../services/chatMembers.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Team } from '../../models/Team.model';
@Component({
  selector: 'app-memberitem',
  templateUrl: './memberitem.component.html',
  styleUrls: ['./memberitem.component.scss'],
})
export class MemberitemComponent implements OnInit {
  @Input() member: User = {};
  @Input() management: Boolean = false;
  @Output() onDeleteMember: EventEmitter<User> = new EventEmitter<User>();
  @Output() onSelectMember: EventEmitter<Boolean> = new EventEmitter<Boolean>();
  constructor(
    private teamService: TeamService,
    private userService: UserService,
    public notificationSocketService: NotificationSocketService,
    private chatMemberService: chatMembersService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  public user: User = {};
  private team: Team = {};
  ngOnInit(): void {
    this.userService.getProfile().subscribe((result: User) => {
      this.user = result;
    });
    this.teamService.getTeam().subscribe((result: Team) => {
      this.team = result;
    });
  }

  public isLeader(): Boolean {
    if(this.team.authorId === this.user.id)
    {
      return true;
    }
    return false;
  }

  public select(member: User) {
    member.selected = true;
    this.onSelectMember.emit(true);
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

  public kickTeamMember(member: User) {
    if (member.id) {
      this.teamService.kickTeamMember(member.id).subscribe(() => {
        let notification: Notification = {};
        notification.content = 'Ai fost exclus din echipa';
        notification.receiverId = member.id;
        notification.senderId = this.user.id;

        const timestamp = new Date();
        timestamp.setHours(timestamp.getHours() + 3);
        notification.timestamp = timestamp;

        notification.type = 'kick';

        this.notificationSocketService.sendNotification(notification);
        this.onDeleteMember.emit(member);
        this.snackBar.open(
          `${member.username} a fost eliminat din echipa`,
          'Close',
          {
            duration: 4000,
          }
        );
      });
    }
  }

  public assignTask(member: User) {
    let dialogRef = this.dialog.open(DialogComponent, {
      data: {
        dialogType: 'newtask',
        username: member.username,
        responsibleId: member.id,
        private: false,
      },
    });
  }
}
