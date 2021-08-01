import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { APIResponse } from '../../models/APIResponse.model';
import { Task } from '../../models/Task.model';
import { User } from '../../models/User.model';
import { TaskService } from '../../services/task.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  constructor(
    private userService: UserService,
    private taskService: TaskService
  ) {}

  public user: User = {};
  public tasks: Array<Task> = [];
  public numberOfTotalTasks: number = 0;
  public numberOfOpenTasks: number = 0;
  public numberOfDoneTasks: number = 0;
  public openTasks: number = 0;
  ngOnInit(): void {
    this.getUserInfo();
  }

  //------------------------------------------------------------------------------------------------
  public getUserInfo() {
    let response: APIResponse;
    this.userService.getUserInfo().subscribe(
      (result: any) => {
        response = result;
        this.user = response.payload;
        if (this.user.tasksId) {
          let tasksId: Array<string> = [];
          tasksId = this.user.tasksId;
          this.getTaskInfo(tasksId);
        }
      },
      (error: HttpErrorResponse) => {
        console.log('Could not fetch user from backend');
        console.log(error);
      }
    );
  }
  //------------------------------------------------------------------------------------------------
  public getTaskInfo(tasksId: Array<string>) {
    let response: APIResponse;
    tasksId.forEach((element) => {
      this.taskService.getTaskInfo(element).subscribe(
        (result: any) => {
          response = result;
          let task: Task = response.payload;
          this.numberOfTotalTasks++;
          if (task.open === true) {
            this.numberOfOpenTasks++;
          } else {
            this.numberOfDoneTasks++;
          }
        },
        (error: HttpErrorResponse) => {
          console.log("Failed to get user's tasks");
          console.log(error);
        }
      );
    });
  }
  //------------------------------------------------------------------------------------------------
}
