import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CommonService } from 'src/app/services/common.service';
import { HttpService } from 'src/app/services/http.service';
import { ProjectFormComponent } from './project-form/project-form.component';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent {

  constructor(private formBuilder:FormBuilder, public dialog: MatDialog, private http:HttpService, private common:CommonService){}
  

  ngOnInit(){

    this.http.getData().subscribe((data)=>{
      this.employee=data
    })
  }

  employee

  openProjectForm(){
    this.openDialog({}, "Add")
  }

  openDialog(data, method) {
    const dialogRef = this.dialog.open(ProjectFormComponent,
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
