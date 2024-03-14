import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, from } from 'rxjs';
import { CommonService } from 'src/app/services/common.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-user-project',
  templateUrl: './user-project.component.html',
  styleUrls: ['./user-project.component.css']
})
export class UserProjectComponent {

  constructor(private formBuilder:FormBuilder, private http:HttpService, private common:CommonService){}

  dateForm:FormGroup
  projects
  leaves
  leavesObservabe=new Subject()
  filterLeave
  today=new Date()

  ngOnInit(){
    this.dateForm = this.formBuilder.group({
      from:[this.today,[ Validators.required]],
      to:[this.today,[ Validators.required]]
    })

    this.leavesObservabe.subscribe((data)=>{
      this.leaves=data
     
    })  

    

    this.http.getAllLeaves().subscribe((data)=>{
      this.leaves=data
      this.filterLeave=data
      this.submit()
      this.http.getProject().subscribe((data)=>{
        this.projects=data
      })
    })

    
  }

  from
  to

  submit(){
   let ves=this.filterLeavesBetweenDates(this.filterLeave, this.dateForm.value.from, this.dateForm.value.to)
   this.leavesObservabe.next(ves)
   this.from=this.dateForm.value.from
   this.to=this.dateForm.value.to
  }

  filterLeavesBetweenDates(leaves, startDate, endDate) {
    return leaves.filter((leave) => {
      const leaveStartDate = new Date(leave.from);
      const leaveEndDate = new Date(leave.to);
      return this.dateRangeOverlaps(startDate.toISOString(), endDate.toISOString(), leaveStartDate.toISOString(), leaveEndDate.toISOString());
    });
  }

  dateRangeOverlaps(a_start, a_end, b_start, b_end) {
    if (a_start <= b_start && b_start <= a_end) return true; // b starts in a
    if (a_start <= b_end && b_end <= a_end) return true; // b ends in a
    if (b_start < a_start && a_end < b_end) return true; // a in b
    return false;
  }

  status
  getStatus(dev){
    
    let variable = this.getSta(dev)
    if(variable){
      this.status="Not Available"
    }else{
      this.status="Available"
    }
    return this.status
  }

  
  lea:boolean
  getSta(developer){
    this.lea=false

    this.leaves.map((leave)=>{
      if(developer.id==leave.user.id){
        this.lea=true
      }
    })
    return this.lea
  }

  array:any
  strength
  getStrength(developers){
    this.strength=''
    this.array=[]

    developers.map((dev)=>{
      var status=this.getStatus(dev.details)
      this.array.push(status)
    })
    if(this.array.length==0){
      this.strength="No Strength data available"
      return this.strength
    }

    let NA=0
    let A=0
    this.array.map((element)=>{
      if(element=="Available"){
        A++
      }else if(element == "Not Available"){
        NA++
      }
    })

    let percentage=this.getPercentage(A, this.array.length)

    if(percentage<=25){
      this.strength="Very Weak"
    }else if(percentage>25 && percentage<=50){
      this.strength="Weak"
    }else if(percentage>50 && percentage<=75){
      this.strength="Moderate"
    }else if(percentage>75){
      this.strength="Strong"
    }

    return {strength:this.strength, percentage:percentage}
  }

  getPercentage(value, total){
    let p = (value/total)*100
    return p
  }

  cName
  getClass(project){
    let c=this.getStrength(project.developers).percentage
    this.cName=''
    if(c<=25){
      this.cName="VW"
    }else if(c>25 && c<=50){
      this.cName="Weak"
    }else if(c>50 && c<=75){
      this.cName="Moderate"
    }else if(c>75){
      this.cName="Strong"
    }
    return this.cName
  }


  



}
