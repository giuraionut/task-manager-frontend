import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/Task.model';
import { User } from '../../models/User.model';
import { UserService } from '../../services/user.service';
import { DialogComponent } from '../../items/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {
  constructor(
    private userService: UserService,
    private taskService: TaskService,
    public dialog: MatDialog
  ) {}

  public tasks: Array<Task> = [];
  public hasTeam: Boolean = false;
  private user: User = {};
  public tasks_panel_img = '../../assets/misc_images/tasks_panel.png';

  ngOnInit(): void {
    console.log('Personal tasks initialized');
    this.userService.getProfile().subscribe((user: User) => {
      this.user = user;
      if (user.teamId != null) {
        this.hasTeam = true;
      }
    });
    this.getTasks('private');
  }

  public showMenu: Boolean = true;
  public taskType: string = '';

  public privateTasks() {
    this.getTasks('private');
  }
  public teamTasks() {
    this.getTasks('public');
  }

  public avatars: Map<string, string> = new Map<string, string>();
  public getTasks(type: string): void {
    this.tasks = [];
    this.taskType = type;
    if (type === 'public') {
      this.taskService.getPublicTasks().subscribe((tasks: Task[]) => {
        this.tasks = tasks;

        this.tasks.forEach((task: Task) => {
          this.avatars.set(task.responsibleId!, '');
        });

        this.avatars.forEach((value: string, key: string) =>
          this.userService.getUserInfo(key).subscribe((user: User) => {
            this.avatars.set(key, user.avatar!);
          })
        );
      });
    } else if (type === 'private') {
      this.taskService.getPrivateTasks().subscribe((response) => {
        this.tasks = response;
      });
    }
  }

  public deleteTaskFunc(task: Task): void {
    this.taskService.deleteTask(task).subscribe(() => {
      this.tasks = this.tasks.filter((t) => t != task);
    });
  }

  public newTask() {
    let dialogRef = this.dialog.open(DialogComponent, {
      data: {
        dialogType: 'newtask',
        username: this.user.username,
        responsibleId: this.user.id,
        private: true,
      },
    });

    dialogRef.afterClosed().subscribe((task: Task) => {
      if (task !== 'false') {
        this.tasks.push(task);
      }
    });
  }
}
