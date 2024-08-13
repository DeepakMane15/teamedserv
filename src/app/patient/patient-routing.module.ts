import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientListComponent } from './patient-list/patient-list.component';
import { AddPatientComponent } from './add-patient/add-patient.component';
import { ViewPatientComponent } from './view-patient/view-patient.component';
import { PermissionGuard } from '../shared/authguard/permission.guard';

const routes: Routes = [
  { path: '', component: PatientListComponent, pathMatch: 'full' },
  {
    path: 'add',
    component: AddPatientComponent,
    pathMatch: 'full',
    canActivate: [PermissionGuard],
    data: { permission: 'Patients', type: 'canEdit' },
  },
  {
    path: 'edit',
    component: AddPatientComponent,
    pathMatch: 'full',
    canActivate: [PermissionGuard],
    data: { permission: 'Patients', type: 'canEdit' },
  },
  {
    path: 'view',
    component: ViewPatientComponent,
    pathMatch: 'full',
    canActivate: [PermissionGuard],
    data: { permission: 'Patients', type: 'canView' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PatientRoutingModule {}
