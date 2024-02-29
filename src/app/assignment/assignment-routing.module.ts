import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssignmentListComponent } from './assignment-list/assignment-list.component';
import { AuthComponent } from '../auth/auth.component';
import { AuthGuard } from '../shared/authguard/auth.guard';
import { AddAssignmentComponent } from './add-assignment/add-assignment.component';

const routes: Routes = [
  {
    path: '',
    component: AssignmentListComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
  },
  {
    path: 'add',
    component: AddAssignmentComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssignmentRoutingModule {}
