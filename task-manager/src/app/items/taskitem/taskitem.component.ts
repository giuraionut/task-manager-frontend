import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { APIResponse } from '../../models/APIResponse.model';
import { Task } from '../../models/Task.model';
import { TaskService } from '../../services/task.service';
import { UserService } from '../../services/user.service';
@Component({
  selector: 'app-taskitem',
  templateUrl: './taskitem.component.html',
  styleUrls: ['./taskitem.component.scss'],
})
export class TaskitemComponent implements OnInit {
  @Input() task!: Task;
  @Output() onDeleteTask: EventEmitter<Task> = new EventEmitter<Task>();
  taskStatus: Subscription = new Subscription();
  taskEdit: Subscription = new Subscription();
  constructor(private taskService: TaskService) {}

  ngOnInit(): void {}
  public onChangeStatus(task: Task) {
    task.open = !task.open;
    this.taskEdit = this.taskService
      .editTask(task)
      .subscribe((response: APIResponse) => {
        console.log(response);
      });
  }

  public editTaskDetails(task: Task, newDetails: string) {
    task.details = newDetails.trim();
    this.taskEdit = this.taskService
      .editTask(task)
      .subscribe((response: APIResponse) => {
        console.log(response);
      });
  }

  public onDelete(task: Task) {
    this.onDeleteTask.emit(task);
  }

  public toggleInput: boolean = false;

  ngOnDestroy(): void {
    this.taskStatus.unsubscribe();
  }
}
