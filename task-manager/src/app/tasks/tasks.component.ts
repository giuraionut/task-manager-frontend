import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';
import { Task } from '../models/Task.model';
import { APIResponse } from '../models/APIResponse.model';
@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {
  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
  }

  public shownTasks: Array<Task> = [];

  private getPrivateTasks() {
    let response: APIResponse;
    this.taskService.getPrivateTasks().subscribe((result: any) => {
      response = result;
      this.shownTasks = response.payload;
    });
  }
  taskTitle = 'Team tasks';

  showMenu = true;

  public teamTasks() {
    this.taskTitle = 'Team tasks';
    this.shownTasks = [];
  }
  public personalTasks() {
    this.taskTitle = 'Private tasks';
    this.getPrivateTasks();
  }
}
