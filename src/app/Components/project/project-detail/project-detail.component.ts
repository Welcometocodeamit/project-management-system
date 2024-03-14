import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, filter, map, startWith, toArray } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';


@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent {

  constructor(private http:HttpService, private formBuilder:FormBuilder, @Inject(MAT_DIALOG_DATA) public data: any,){}

  filteredOptions: Observable<any[]>;
  displayedColumns: string[] = ['name', 'date', 'role', 'action'];
  projectDevelopers=this.data

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.employee.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  ngOnInit(){

    this.http.getData().subscribe((data:any[])=>{
      this.employee=data.filter((data)=>data.role=='Developer' || data.role=='Tester')
      this.filteredOptions = this.developerForm.get('details').valueChanges.pipe(
        startWith(''),
        map(value => {
          const name = typeof value === 'string' ? value : value?.name;
          return name ? this._filter(name as string) : this.employee.slice();
        }),
      );
    })

    this.developerForm = this.formBuilder.group({
      details:[, Validators.required],
      startDate:[ , Validators.required],
    });

    this.http.projectDetailObservable.subscribe((data)=>{
      this.projectDevelopers=data
    })

  }

  today=new Date
  employee
  developerForm:FormGroup
  
  displayFn(employee: any): string {
    return employee && employee.name ? employee.name : '';
  }

  Add(){
    this.projectDevelopers.developers.push(this.developerForm.value)
    this.http.updateDeveloper(this.projectDevelopers.id, this.projectDevelopers).subscribe((data)=>{
      this.http.getProjectById(this.projectDevelopers.id).subscribe((data)=>{
        this.http.projectDetailObservable.next(data)
      })
    })
    this.developerForm.reset()
  }


  removeDeveloper(id){
    console.log(id)
    this.projectDevelopers.developers=this.projectDevelopers.developers.filter((data)=>
      data.details.id!=id
    )

    this.http.updateDeveloper(this.projectDevelopers.id, this.projectDevelopers).subscribe((data)=>{
      this.http.getProjectById(this.projectDevelopers.id).subscribe((data)=>{
        this.http.projectDetailObservable.next(data)
      })
    })
  }

  checkIfExist(emp){
    let exist=false
    this.projectDevelopers.developers.map((data)=>{
      if(emp.id==data.details.id){
        exist=true
      }
    })
    return exist
  }

}
