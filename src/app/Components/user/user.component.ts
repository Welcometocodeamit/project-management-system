import { Component, Input } from '@angular/core';
import users from '../../../assets/Data/userData.json'
import { user } from '../../models/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'src/app/services/http.service';
import { CommonService } from 'src/app/services/common.service';
import { MatDialog } from '@angular/material/dialog';
import { UserFormComponent } from './user-form/user-form.component';
// import * as fs from 'fs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {

  constructor(private formBuilder: FormBuilder, public dialog: MatDialog, private http: HttpService, private common: CommonService) { }

  ngOnInit() {

    this.http.getData().subscribe((data: any) => {
      this.users = data
      this.common.users = data
    })

    this.http.userObservable.subscribe((data: any) => {
      this.users = data
      this.common.users = data
    })
  }

  userForm: FormGroup
  users: user[]


  openUserForm() {
    this.openDialog({}, "Add")
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
