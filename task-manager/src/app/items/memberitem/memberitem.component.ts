import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../models/User.model';
@Component({
  selector: 'app-memberitem',
  templateUrl: './memberitem.component.html',
  styleUrls: ['./memberitem.component.scss']
})
export class MemberitemComponent implements OnInit {

  @Input() members: Array<User> = [];
  @Input() management: Boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

}
