import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../items/dialog/dialog.component';

@Component({
  selector: 'app-updateuserinfo',
  templateUrl: './updateuserinfo.component.html',
  styleUrls: ['./updateuserinfo.component.scss'],
})
export class UpdateuserinfoComponent implements OnInit {
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  public uploadAvatar(event: any) {
    let dialogRef = this.dialog.open(DialogComponent, {
      data: {
        dialogType: 'uploadimg',
        imgType: 'userAvatar',
        image: event,
      },
    });
  }
}
