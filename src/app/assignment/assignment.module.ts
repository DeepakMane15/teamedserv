import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssignmentRoutingModule } from './assignment-routing.module';
import { AssignmentListComponent } from './assignment-list/assignment-list.component';


@NgModule({
  declarations: [AssignmentListComponent],
  imports: [
    CommonModule,
    AssignmentRoutingModule
  ]
},

)
export class AssignmentModule { }
