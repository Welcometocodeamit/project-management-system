import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './Components/user/user.component';
import { ProjectComponent } from './Components/project/project.component';
import { UserProjectComponent } from './Components/user-project/user-project.component';
import { LeaveComponent } from './Components/leave/leave.component';

const routes: Routes = [
  {path:'user', component:UserComponent},
  {path:'project', component:ProjectComponent},
  {path:'report', component:UserProjectComponent},
  {path:'leave', component:LeaveComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
