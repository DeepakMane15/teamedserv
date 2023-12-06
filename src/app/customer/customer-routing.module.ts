import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomersListComponent } from './customers-list/customers-list.component';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { ViewCustomerComponent } from './view-customer/view-customer.component';

const routes: Routes = [
  { path: '', component: CustomersListComponent },
  { path: 'add', component: AddCustomerComponent, pathMatch: 'full' },
  { path: 'edit', component: AddCustomerComponent, pathMatch: 'full' },
  { path: 'view', component: ViewCustomerComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerRoutingModule {}
