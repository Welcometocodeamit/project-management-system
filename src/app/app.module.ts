import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { UserComponent } from './Components/user/user.component';
import { ProjectComponent } from './Components/project/project.component';
import { UserProjectComponent } from './Components/user-project/user-project.component';
import { LeaveComponent } from './Components/leave/leave.component';
import { RouterModule } from '@angular/router';
import { UserCardComponent } from './Components/user/user-card/user-card.component';
import {MatCardModule} from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import {MatTableModule} from '@angular/material/table';
import { ProjectTableComponent } from './Components/project/project-table/project-table.component';
import {MatSelectModule} from '@angular/material/select';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { UserFormComponent } from './Components/user/user-form/user-form.component';
import { ProjectFormComponent } from './Components/project/project-form/project-form.component';
import { ProjectDetailComponent } from './Components/project/project-detail/project-detail.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatNativeDateModule} from '@angular/material/core';
import { LeaveTableComponent } from './Components/leave/leave-table/leave-table.component';
import { LeaveFormComponent } from './Components/leave/leave-form/leave-form.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatDividerModule} from '@angular/material/divider';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    UserComponent,
    ProjectComponent,
    UserProjectComponent,
    LeaveComponent,
    UserCardComponent,
    ProjectTableComponent,
    UserFormComponent,
    ProjectFormComponent,
    ProjectDetailComponent,
    LeaveTableComponent,
    LeaveFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule,
    MatTableModule,
    MatSelectModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatExpansionModule,
    MatAutocompleteModule,
    MatDividerModule
  ],
  exports:[RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
