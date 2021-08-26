import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { NotificationSocketService } from '../services/notificationWebSocket.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  
  constructor(
    private user: UserService,
    private router: Router,
    public notificationSocketService: NotificationSocketService
  ) {}

  ngOnInit(): void {
    this.notificationSocketService.openNotificationChannel();
  }

  public logout() {
    this.user.signout();
  }

  mobile: boolean = false;

  public accsettings() {
    this.router.navigate(['/taskmanager/settings']);
  }

  ngOnDestroy(): void {
    this.notificationSocketService.closeNotificationChannel();
  }
}
