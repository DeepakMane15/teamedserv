import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MedicalListComponent } from './medical-list/medical-list.component';
import { AddMedicalComponent } from './add-medical/add-medical.component';
import { ViewMedicalComponent } from './view-medical/view-medical.component';
import { PermissionGuard } from '../shared/authguard/permission.guard';

const routes: Routes = [
  { path: '', component: MedicalListComponent },
  {
    path: 'add',
    component: AddMedicalComponent,
    canActivate: [PermissionGuard],
    data: { permission: 'Medical Team', type: 'canEdit' },
  },
  {
    path: 'edit',
    component: AddMedicalComponent,
    canActivate: [PermissionGuard],
    data: { permission: 'Medical Team', type: 'canEdit' },
  },
  {
    path: 'view',
    component: ViewMedicalComponent,
    canActivate: [PermissionGuard],
    data: { permission: 'Medical Team', type: 'canView' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MedicalRoutingModule {}
