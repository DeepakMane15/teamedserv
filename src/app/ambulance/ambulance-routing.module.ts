import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AmbulanceListComponent } from '../ambulance-list/ambulance-list.component';
import { AuthGuard } from '../shared/authguard/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: AmbulanceListComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AmbulanceRoutingModule {}
