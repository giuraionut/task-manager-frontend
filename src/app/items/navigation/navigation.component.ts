import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { NotificationSocketService } from '../../services/notificationWebSocket.service';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/User.model';
import { RefreshToken } from '../../models/RefreshToken.model';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  eventsSubject: Subject<void> = new Subject<void>();
  constructor(
    private userService: UserService,
    private router: Router,
    public notificationSocketService: NotificationSocketService,
    private authservice: AuthService
  ) {}

  ngOnInit(): void {
    this.notificationSocketService.openNotificationChannel();
    this.userService.getProfile().subscribe((user: User) => {
      if (user.refreshToken) {
        let refreshToken: RefreshToken = { refreshToken: user.refreshToken };
        this.authservice.refreshToken(refreshToken).subscribe();
      }
    });
  }
  public eventNext()
  {
    this.eventsSubject.next();
  }
  public logout() {
    this.userService.signout();
  }

  mobile: boolean = false;

  public accsettings() {
    this.router.navigate(['/taskmanager/settings']);
  }

  ngOnDestroy(): void {
    this.notificationSocketService.closeNotificationChannel();
  }
}
