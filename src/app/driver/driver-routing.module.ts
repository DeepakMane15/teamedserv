import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DriverListComponent } from './driver-list/driver-list.component';
import { ViewDriverComponent } from './view-driver/view-driver.component';

const routes: Routes = [
  { path: '', component: DriverListComponent, pathMatch: 'full' },
  {
    path: 'view',
    component:ViewDriverComponent,
    pathMatch:'full',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DriverRoutingModule {}
