import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientListComponent } from './patient-list/patient-list.component';
import { AddPatientComponent } from './add-patient/add-patient.component';
import { ViewPatientComponent } from './view-patient/view-patient.component';

const routes: Routes = [
  { path: '', component: PatientListComponent, pathMatch: 'full' },
  { path: 'add', component: AddPatientComponent, pathMatch: 'full' },
  { path: 'edit', component: AddPatientComponent, pathMatch: 'full' },
  { path: 'view', component: ViewPatientComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PatientRoutingModule {}
