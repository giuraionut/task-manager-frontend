import { Component, Input, OnInit } from '@angular/core';
import { Task } from '../../models/Task.model';
import { TaskService } from '../../services/task.service';
import { NotificationSocketService } from '../../services/notificationWebSocket.service';
import { Notification } from '../../models/Notification.model';
import { UserService } from '../../services/user.service';
import { User } from '../../models/User.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';
interface Priority {
  value: string;
  viewValue: string;
}

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
    private userService: UserService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<NewtaskComponent>
  ) {}

  priorities: Priority[] = [
    { value: 'high', viewValue: 'Prioritate Inalta' },
    { value: 'medium', viewValue: 'Prioritate Medie' },
    { value: 'low', viewValue: 'Prioritate Scazuta' },
  ];

  private user: User = {};

  public createTask(name: string, details: string, priority: string): void {
    let task: Task = {};
    task.name = name;
    task.details = details;
    task.priority = priority;
    task.responsibleId = this.data.responsibleId;
    task.private = this.data.private;

    this.taskService.newTask(task).subscribe((task: Task) => {
      this.dialogRef.close(task);
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
    this.snackBar.open(`Task ${task.name} creat cu succcess`, 'Close', {
      duration: 4000,
    });
  }

  ngOnInit(): void {
    this.userService.getProfile().subscribe((user: User) => {
      this.user = user;
    });
  }
}
