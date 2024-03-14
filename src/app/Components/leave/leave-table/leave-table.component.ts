import { Component } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-leave-table',
  templateUrl: './leave-table.component.html',
  styleUrls: ['./leave-table.component.css']
})
export class LeaveTableComponent {

  constructor(private http:HttpService, private common:CommonService){}

  ngOnInit(){
    this.http.getAllLeaves().subscribe((data)=>{
      this.leaves=data
      this.common.leaves=data
    })

    this.http.leaveTableObservable.subscribe((data)=>{
      this.leaves=data
      this.common.leaves=data
    })
  }

  displayedColumns: string[] = ['employee', 'from', 'to', 'action'];
  leaves

  deleteLeave(id){
    this.http.deleteLeave(id).subscribe((data)=>{
      this.http.getAllLeaves().subscribe((data)=>{
        this.http.leaveTableObservable.next(data)
      })
    })
  }
}
