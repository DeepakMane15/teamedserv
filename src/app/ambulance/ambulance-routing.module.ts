import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AmbulanceListComponent } from '../ambulance/ambulance-list/ambulance-list.component';
import { AuthGuard } from '../shared/authguard/auth.guard';
import { AddAmbulanceComponent } from './add-ambulance/add-ambulance.component';
import { ViewAmbulanceComponent } from './view-ambulance/view-ambulance.component';
import { PermissionGuard } from '../shared/authguard/permission.guard';

const routes: Routes = [
  {
    path: '',
    component: AmbulanceListComponent,
  },
  {
    path: 'add',
    component: AddAmbulanceComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: { permission: 'Ambulance', type: 'canEdit' },
  },
  {
    path: 'edit',
    component: AddAmbulanceComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: { permission: 'Ambulance', type: 'canEdit' },
  },
  {
    path: 'view',
    component: ViewAmbulanceComponent,
    canActivate: [AuthGuard, PermissionGuard],
    data: { permission: 'Ambulance', type: 'canView' },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AmbulanceRoutingModule {}
