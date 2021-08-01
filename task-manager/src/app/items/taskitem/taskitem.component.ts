import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { APIResponse } from '../../models/APIResponse.model';
import { Task } from '../../models/Task.model';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-taskitem',
  templateUrl: './taskitem.component.html',
  styleUrls: ['./taskitem.component.scss'],
})
export class TaskitemComponent implements OnInit {
  @Input() task!: Task;
  @Output() onDeleteTask: EventEmitter<Task> = new EventEmitter<Task>();
  taskStatus: Subscription = new Subscription();

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {}

  public onChangeStatus(task: Task) {
    this.taskStatus = this.taskService
      .changeTaskStatus(task)
      .subscribe((result: APIResponse) => {
        task.open = result.payload;
      });
  }

  public onDelete(task: Task) {
    this.onDeleteTask.emit(task);
  }

  ngOnDestroy(): void {
    this.taskStatus.unsubscribe();
  }
}
