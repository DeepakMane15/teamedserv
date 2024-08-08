import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddJobPostComponent } from './add-job-post/add-job-post.component';
import { JobPostRoutingModule } from './job-post-routing.module';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
// import { MaterialEventCalendarModule } from 'angular-material-event-calendar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlatpickrModule } from 'angularx-flatpickr';
import { FullCalendarModule } from '@fullcalendar/angular';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AddEventDialogComponent } from './add-event-dialog/add-event-dialog.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NgxMatTimepickerModule } from 'ngx-mat-timepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { JobPostListComponent } from './job-post-list/job-post-list.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';


@NgModule({
  declarations: [
    AddJobPostComponent,
    AddEventDialogComponent,
    JobPostListComponent
  ],
  imports: [
    CommonModule,
    JobPostRoutingModule,
    MatDividerModule,
    MatIconModule,
    MatProgressSpinnerModule,
    FormsModule,
    FullCalendarModule,
    MatToolbarModule,
    MatDatepickerModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatDialogModule,
    MatNativeDateModule,
    NgxMatTimepickerModule,
    MatRadioModule,
    MatPaginatorModule,
    MatTableModule
  ]
})
export class JobPostModule { }
