import { Component, Input } from '@angular/core';
import { user } from '../../../models/user';
import { HttpService } from 'src/app/services/http.service';
import { MatDialog } from '@angular/material/dialog';
import { UserFormComponent } from '../user-form/user-form.component';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent {

  constructor(private http:HttpService, public dialog: MatDialog){}

  displayedColumns: string[] = ['id', 'name', 'email', 'role', 'action'];

  @Input() user:user[]

  deleteUser(userId){
    this.http.deleteUser(userId).subscribe((data)=>{
      this.http.getData().subscribe((data)=>{
        this.http.userObservable.next(data)
      })
    })
  }

  updateUser(user){
    this.openDialog(user, "Update")
  }

  openDialog(data, method) {
    const dialogRef = this.dialog.open(UserFormComponent,
      {
        data:{
          mainData:data,
          method:method
        }
      });

    dialogRef.afterClosed().subscribe(result => {

    });
  }

}
