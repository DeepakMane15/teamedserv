import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LivingListComponent } from './living-list/living-list.component';
import { AddLivingComponent } from './add-living/add-living.component';
import { LivingBoardComponent } from './living-board/living-board.component';
import { ViewLivingComponent } from './view-living/view-living.component';
import { PermissionGuard } from '../shared/authguard/permission.guard';

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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LivingRoutingModule {}
