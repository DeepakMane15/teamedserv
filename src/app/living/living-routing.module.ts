import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LivingListComponent } from './living-list/living-list.component';
import { AddLivingComponent } from './add-living/add-living.component';
import { LivingBoardComponent } from './living-board/living-board.component';
import { ViewLivingComponent } from './view-living/view-living.component';
import { PermissionGuard } from '../shared/authguard/permission.guard';
import { LivingRequestComponent } from './living-request/living-request.component';
import { LivingRequestListComponent } from './living-request-list/living-request-list.component';

const routes: Routes = [
  { path: '', component: LivingListComponent, pathMatch: 'full' },
  {
    path: 'board',
    component: LivingBoardComponent,
    pathMatch: 'full',
    canActivate: [PermissionGuard],
    data: { permission: 'Medical Facility Board', type: 'canView' },
  },
  {
    path: 'add',
    component: AddLivingComponent,
    pathMatch: 'full',
    canActivate: [PermissionGuard],
    data: { permission: 'Medical Facilities', type: 'canEdit' },
  },
  {
    path: 'edit',
    component: AddLivingComponent,
    pathMatch: 'full',
    canActivate: [PermissionGuard],
    data: { permission: 'Medical Facilities', type: 'canEdit' },
  },
  {
    path: 'board/view',
    component: ViewLivingComponent,
    pathMatch: 'full',
    canActivate: [PermissionGuard],
    data: { permission: 'Medical Facility Board', type: 'canView' },
  },
  {
    path: 'view',
    component: ViewLivingComponent,
    pathMatch: 'full',
    canActivate: [PermissionGuard],
    data: { permission: 'Medical Facilities', type: 'canView' },
  },
  {
    path: 'request/add',
    component: LivingRequestComponent,
    pathMatch: 'full',
    canActivate: [PermissionGuard],
    data: { permission: 'Medical Facilities', type: 'canEdit' },
  },
  {
    path: 'requests',
    component: LivingRequestListComponent,
    pathMatch: 'full',
    canActivate: [PermissionGuard],
    data: { permission: 'Medical Facilities', type: 'canEdit' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LivingRoutingModule {}
