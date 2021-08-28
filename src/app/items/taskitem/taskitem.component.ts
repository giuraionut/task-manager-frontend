import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { APIResponse } from '../../models/APIResponse.model';
import { Task } from '../../models/Task.model';
import { User } from '../../models/User.model';
import { UserService } from '../../services/user.service';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-taskitem',
  templateUrl: './taskitem.component.html',
  styleUrls: ['./taskitem.component.scss'],
})
export class TaskitemComponent implements OnInit {
  @Input() task!: Task;
  @Input() avatar!: string;
  @Output() onDeleteTask: EventEmitter<Task> = new EventEmitter<Task>();

  constructor(
    private taskService: TaskService,
    private userService: UserService
  ) {}

  public author: User = {};
  public responsible: User = {};
  public lastUser: User = {};
  public user: User = {};

  ngOnInit(): void {
    this.userService.getProfile().subscribe((user: User) => {
      this.user = user;
    });
  
  }
  
  public onChangeStatus(task: Task) {
    task.open = !task.open;
    this.taskService.editTask(task).subscribe((response: APIResponse) => {
      console.log(response);
    });
  }

  public checkAuthor(authorId: string) {
    if (this.user.id === authorId) {
      return true;
    }
    return false;
  }

  public editTaskDetails(task: Task, newDetails: string) {
    task.details = newDetails.trim();
    this.taskService.editTask(task).subscribe();
    this.lastUser = this.user;
  }

  public taskInfo(authorId: string, responsibleId: string, lastUserId: string) {
    this.userService.getUserInfo(authorId).subscribe((user: User) => {
      this.author = user;
      if (user.id === lastUserId)
      {
        this.lastUser = user;
      }
    });
    this.userService.getUserInfo(responsibleId).subscribe((user: User) => {
      this.responsible = user;
      if (user.id === lastUserId)
      {
        this.lastUser = user;
      }
    });
  }

  public onDelete(task: Task) {
    this.onDeleteTask.emit(task);
  }

  public toggleInput: boolean = false;
}
