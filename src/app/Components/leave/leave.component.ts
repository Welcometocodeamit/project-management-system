import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LeaveFormComponent } from './leave-form/leave-form.component';

@Component({
  selector: 'app-leave',
  templateUrl: './leave.component.html',
  styleUrls: ['./leave.component.css']
})
export class LeaveComponent {

  constructor(public dialog: MatDialog){}

  openLeaveDialog(){
    this.openDialog()
  }

  openDialog() {
    const dialogRef = this.dialog.open(LeaveFormComponent,
      {});

    dialogRef.afterClosed().subscribe(result => {

    });
  }

}
