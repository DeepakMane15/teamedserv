import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomersListComponent } from './customers-list/customers-list.component';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { ViewCustomerComponent } from './view-customer/view-customer.component';
import { AddUserComponent } from './add-user/add-user.component';
import { PermissionGuard } from '../shared/authguard/permission.guard';

const routes: Routes = [
  { path: '', component: CustomersListComponent },
  {
    path: 'add',
    component: AddCustomerComponent,
    pathMatch: 'full',
    canActivate: [PermissionGuard],
    data: { permission: 'Customer', type: 'canEdit' },
  },
  {
    path: 'edit',
    component: AddCustomerComponent,
    pathMatch: 'full',
    canActivate: [PermissionGuard],
    data: { permission: 'Customer', type: 'canEdit' },
  },
  {
    path: 'view',
    component: ViewCustomerComponent,
    pathMatch: 'full',
    canActivate: [PermissionGuard],
    data: { permission: 'Customer', type: 'canView' },
  },
  {
    path: 'add-user',
    component: AddUserComponent,
    pathMatch: 'full',
    canActivate: [PermissionGuard],
    data: { permission: 'Customer', type: 'canEdit' },
  },
  {
    path: 'user/edit',
    component: AddUserComponent,
    pathMatch: 'full',
    canActivate: [PermissionGuard],
    data: { permission: 'Customer', type: 'canEdit' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerRoutingModule {}
