import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/Task.model';
import { APIResponse } from '../../models/APIResponse.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {
  constructor(private taskService: TaskService) {}

  getTasks: Subscription = new Subscription();
 
  deleteTask: Subscription = new Subscription();
  public tasks: Array<Task> = [];

  ngOnInit(): void {
    console.log('Personal tasks initialized');
    this.getTasks = this.taskService.getPrivateTasks().subscribe(
      (response: APIResponse) => {
        this.tasks = response.payload;
      },
      (error: HttpErrorResponse) => {
        console.log('Could not get tasks', error);
      }
    );
  }

  public deleteTaskFunc(task: Task) {
    this.deleteTask = this.taskService.deleteTask(task).subscribe(() => {
      this.tasks = this.tasks.filter((t) => t != task);
    });
  }
  ngOnDestroy(): void {
    console.log('Personal tasks destroyed');
    this.getTasks.unsubscribe();
    this.deleteTask.unsubscribe();
  }
}
