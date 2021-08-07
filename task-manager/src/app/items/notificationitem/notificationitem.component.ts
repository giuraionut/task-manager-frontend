import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Notification } from '../../models/Notification.model';
@Component({
  selector: 'app-notificationitem',
  templateUrl: './notificationitem.component.html',
  styleUrls: ['./notificationitem.component.scss'],
})
export class NotificationitemComponent implements OnInit {
  @Input() notifications: Array<Notification> = [];
  @Output() dismissedEvent: EventEmitter<any> = new EventEmitter<any>();
  constructor() {}

  ngOnInit(): void {}
  
  public noNotif: Boolean = false;
  public dismissNotif() {
    this.notifications.filter(
      (notification) => (notification.stateRead = true)
    );
    this.noNotif = true;
    this.dismissedEvent.emit();
  }
}
