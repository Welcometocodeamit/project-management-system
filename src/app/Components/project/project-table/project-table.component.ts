import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommonService } from 'src/app/services/common.service';
import { HttpService } from 'src/app/services/http.service';
import { ProjectDetailComponent } from '../project-detail/project-detail.component';
import { ProjectFormComponent } from '../project-form/project-form.component';

@Component({
  selector: 'app-project-table',
  templateUrl: './project-table.component.html',
  styleUrls: ['./project-table.component.css']
})
export class ProjectTableComponent {

  constructor(private http:HttpService, public dialog: MatDialog, private common:CommonService){}

  ngOnInit(){
    this.http.getProject().subscribe((data)=>{
      this.project=data
      this.common.projects=data
    })

    this.http.projectObservable.subscribe((data)=>{
      this.project=data
      this.common.projects=data
    })
  }

  project
  displayedColumns: string[] = ['id', 'projectName', 'projectManager', 'developers', 'action'];

  deleteProject(projectId){
    this.http.deleteProject(projectId).subscribe((data)=>{
      this.http.getProject().subscribe((data)=>{
        this.http.projectObservable.next(data)
      })
    })
  }

  goToDetails(element){
    this.openDialog(element)
  }

  updateProject(element){
    this.openDialogForm(element, "Update")
  }

  openDialogForm(data, method) {
    const dialogRef = this.dialog.open(ProjectFormComponent, {
      data:{
        mainData:data,
        method:method
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openDialog(element) {
    const dialogRef = this.dialog.open(ProjectDetailComponent, {
      data:element
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}


