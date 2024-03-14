import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { CommonService } from 'src/app/services/common.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-leave-form',
  templateUrl: './leave-form.component.html',
  styleUrls: ['./leave-form.component.css']
})
export class LeaveFormComponent {

  constructor(private formBuilder:FormBuilder, private http:HttpService, private common:CommonService){}

  leaveForm:FormGroup
  employees
  today=new Date()
  filteredOptions: Observable<any[]>;

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.employees.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  ngOnInit(){
    this.http.getData().subscribe((data)=>{
      this.employees=data
      this.filteredOptions = this.leaveForm.get('user').valueChanges.pipe(
        startWith(''),
        map(value => {
          const name = typeof value === 'string' ? value : value?.name;
          return name ? this._filter(name as string) : this.employees.slice();
        }),
      );
    })

    this.leaveForm = this.formBuilder.group({
      id:[],
      user:['', Validators.required],
      from:['',[ Validators.required]],
      to:['',[ Validators.required]]
    })
  }

  displayFn(employee: any): string {
    return employee && employee.name ? employee.name : '';
  }

  submit(){
    this.leaveForm.value.id=this.common.getNextId(this.common.leaves)

    this.leaveForm.value.from=new Date(this.leaveForm.value.from)
    this.leaveForm.value.to=new Date(this.leaveForm.value.to)
    this.http.addLeave(this.leaveForm.value).subscribe((data)=>{
      this.http.getAllLeaves().subscribe((data)=>{
        this.http.leaveTableObservable.next(data)
      })
    })
  }
}
