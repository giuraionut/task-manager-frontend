import { Component, OnInit } from '@angular/core';
import { APIResponse } from '../../models/APIResponse.model';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-taskprogressbar',
  templateUrl: './taskprogressbar.component.html',
  styleUrls: ['./taskprogressbar.component.scss'],
})
export class TaskprogressbarComponent implements OnInit {
  constructor(private taskService: TaskService) {}
  public numberOfOpenTasks: number = 0;
  public numberOfDoneTasks: number = 0;

  ngOnInit(): void {
    this.countPublicTasks();
  }
  public countPublicTasks() {
    this.taskService
      .countPublicTasks('public', 'open')
      .subscribe((response) => {
        this.numberOfOpenTasks = response;
      });
    this.taskService
      .countPublicTasks('public', 'closed')
      .subscribe((response) => {
        this.numberOfDoneTasks = response;
      });
  }
}
