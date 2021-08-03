import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/Task.model';
import { APIResponse } from '../../models/APIResponse.model';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {
  constructor(private taskService: TaskService) {}

  public tasks: Array<Task> = [];

  ngOnInit(): void {
    console.log('Personal tasks initialized');
    this.getTasks('private');
  }

  public showMenu: Boolean = true;
  public taskType: string = '';
  
  public privateTasks()
  {
    this.getTasks('private');
  }
  public teamTasks()
  {
    this.getTasks('public');
  }

  public getTasks(type: string): void {
    this.taskService.getTasks(type).subscribe(
      (response: APIResponse) => {
        this.tasks = response.payload;
        this.taskType = type;
        console.log('Tasks obtained');
      },
      (error: HttpErrorResponse) => {
        console.log('Could not get tasks', error);
      }
    );
  }

  public deleteTaskFunc(task: Task): void {
    this.taskService.deleteTask(task).subscribe(() => {
      this.tasks = this.tasks.filter((t) => t != task);
    });
  }

  public newTask() {
    let task: Task = {};

    task.name = 'New task';
    task.details = 'New task content';
    this.taskService.newTask(task).subscribe(
      (response: APIResponse) => {
        let responseTask: Task = response.payload;
        console.log(responseTask);
        this.tasks.push(responseTask);
      },
      (error: HttpErrorResponse) => {
        console.log('Failed to create new task', error);
      }
    );
  }

  ngOnDestroy(): void {
    console.log('Personal tasks destroyed');
  }
}
