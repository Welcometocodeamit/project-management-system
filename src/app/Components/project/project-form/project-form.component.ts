import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonService } from 'src/app/services/common.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.css']
})
export class ProjectFormComponent {

  constructor(private formBuilder:FormBuilder, @Inject(MAT_DIALOG_DATA) public data, private http:HttpService, private common:CommonService){}

  ngOnInit(){
    
    this.projectForm = this.formBuilder.group({
      id:[this.data.mainData.id],
      projectName:[this.data.mainData.projectName, Validators.required],
      projectManager:[this.data.mainData.projectManager, Validators.required],
      developers:[this.data.mainData.developers]
    })

    this.http.getManagers().subscribe((data)=>{
      this.employee=data
    })


  }

  compareObjects(obj1: any, obj2: any): boolean {
    return obj1 && obj2 && obj1.id === obj2.id; 
  }
  
  employee
  projectForm:FormGroup

  submit(){

    if(this.data.method=="Add"){
      this.projectForm.value.id=this.common.getNextId(this.common.projects)
      this.projectForm.value.developers=[]
      this.http.addProject(this.projectForm.value).subscribe((data)=>{
        this.http.getProject().subscribe((data)=>{
          this.http.projectObservable.next(data)
        })
      })
    }else{
      this.http.updateProject(this.projectForm.value.id, this.projectForm.value).subscribe((data)=>{
        this.http.getProject().subscribe((data)=>{
          this.http.projectObservable.next(data)
        })
      })
    }
  }

  
}
