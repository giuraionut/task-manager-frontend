import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/Task.model';
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

  public privateTasks() {
    this.getTasks('private');
  }
  public teamTasks() {
    this.getTasks('public');
  }

  public getTasks(type: string): void {
    this.taskService.getTasks(type).subscribe((response) => {
      this.tasks = response;
      this.taskType = type;
    });
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
      (response) => {
        this.tasks.push(response);
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
