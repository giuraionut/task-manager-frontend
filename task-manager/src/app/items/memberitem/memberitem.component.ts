import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../models/User.model';
import { TeamService } from '../../services/team.service';
@Component({
  selector: 'app-memberitem',
  templateUrl: './memberitem.component.html',
  styleUrls: ['./memberitem.component.scss'],
})
export class MemberitemComponent implements OnInit {
  @Input() members: Array<User> = [];
  @Input() management: Boolean = false;
  constructor(private teamService: TeamService) {}

  ngOnInit(): void {}

  public kickTeamMember(id: string) {
    this.teamService.kickTeamMember(id).subscribe(() => {
      this.members = this.members.filter((member) => member.id != id);
    });
  }
}
