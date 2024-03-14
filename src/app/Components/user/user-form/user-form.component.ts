import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonService } from 'src/app/services/common.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent {

  constructor(private formBuilder:FormBuilder, @Inject(MAT_DIALOG_DATA) public data, private http:HttpService, private common:CommonService){}

  userForm:FormGroup
  roles=["Manager", "Developer", "Tester"]
  ngOnInit(){
    this.userForm = this.formBuilder.group({
      id:[this.data.mainData.id],
      name:[this.data.mainData.name, Validators.required],
      email:[this.data.mainData.email,[ Validators.required, Validators.email]],
      role:[this.data.mainData.role,  Validators.required]
    })
  }

  submit(){
    if(this.data.method=="Add"){
      this.userForm.value.id=this.common.getNextId(this.common.users)
      this.http.addData(this.userForm.value).subscribe((data)=>{
        this.http.getData().subscribe((data)=>{
          this.http.userObservable.next(data)
        })
      })
    }else{
      this.http.updateUser( this.userForm.value.id, this.userForm.value).subscribe((data)=>{
        this.http.getData().subscribe((data)=>{
          this.http.userObservable.next(data)
        })
      })
    }
  }

}
