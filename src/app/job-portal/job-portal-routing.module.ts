import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobPortalListComponent } from './job-portal-list/job-portal-list.component';
import { AddJobOpeningComponent } from './add-job-opening/add-job-opening.component';
import { ViewJobOpeningComponent } from './view-job-opening/view-job-opening.component';
import { PermissionGuard } from '../shared/authguard/permission.guard';

const routes: Routes = [
  {
    path: '',
    component: JobPortalListComponent,
    pathMatch: 'full',
  },
  {
    path: 'add',
    component: AddJobOpeningComponent,
    pathMatch: 'full',
    canActivate: [PermissionGuard],
    data: { permission: "Field Openings", type: 'canEdit' },
  },
  {
    path: 'edit',
    component: AddJobOpeningComponent,
    pathMatch: 'full',
    canActivate: [PermissionGuard],
    data: { permission: "Field Openings", type: 'canEdit' },
  },
  {
    path: 'view',
    component: ViewJobOpeningComponent,
    pathMatch: 'full',
    canActivate: [PermissionGuard],
    data: { permission: "Field Openings", type: 'canView' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JobPortalRoutingModule {}
