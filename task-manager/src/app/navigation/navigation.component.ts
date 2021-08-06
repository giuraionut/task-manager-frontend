import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { NotificationService } from '../services/notification.service';
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  constructor(
    private user: UserService,
    private router: Router,
    public notificationService: NotificationService
  ) {}

  public activeBell: Boolean = true;
  public dismissed: Boolean = false;
  ngOnInit(): void {
    this.notificationService.openNotificationChannel();
  }

  public logout() {
    this.user.signout();
  }

  mobile: boolean = false;

  public accsettings() {
    this.router.navigate(['/taskmanager/settings']);
  }

  ngOnDestroy(): void {
    this.notificationService.closeNotificationChannel();
  }
}
