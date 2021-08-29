import { Component, Input, OnInit } from '@angular/core';
import { Task } from '../../models/Task.model';
import { TaskService } from '../../services/task.service';
import { NotificationSocketService } from '../../services/notificationWebSocket.service';
import { Notification } from '../../models/Notification.model';
import { UserService } from '../../services/user.service';
import { User } from '../../models/User.model';
@Component({
  selector: 'app-newtask',
  templateUrl: './newtask.component.html',
  styleUrls: ['./newtask.component.scss'],
})
export class NewtaskComponent implements OnInit {
  @Input() data: any;

  constructor(
    private taskService: TaskService,
    public notificationSocketService: NotificationSocketService,
    private userService: UserService
  ) {}

  private user: User = {};

  public createTask(name: string, details: string): void {
    let task: Task = {};
    task.name = name;
    task.details = details;
    task.responsibleId = this.data.responsibleId;
    task.private = false;
    //task.teamId = this.data.teamId;

    this.taskService.newTask(task).subscribe((task: Task) => {
      let notification: Notification = {};
      notification.receiverId = this.data.responsibleId;
      notification.senderId = this.user.id;

      const timestamp = new Date();
      timestamp.setHours(timestamp.getHours() + 3);
      notification.timestamp = timestamp;
      notification.type = 'newtask';
      
      notification.content = `Ai primit un nou task: ${task.name}`;

      this.notificationSocketService.sendNotification(notification);
    });
  }

  ngOnInit(): void {
    this.userService.getProfile().subscribe((user: User) => {
      this.user = user;
    });
  }
}
