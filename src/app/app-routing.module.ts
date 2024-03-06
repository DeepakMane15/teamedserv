import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './shared/authguard/auth.guard';
import { LoginGuard } from './shared/loginguard/login.guard';
import { TeamBoardComponent } from './team-board/team-board.component';
import { ViewMedicalComponent } from './view-medical/view-medical.component';
import { TeamInvitationComponent } from './team-invitation/team-invitation.component';
import { Path } from 'leaflet';

const routes: Routes = [
  {
    path: 'auth',
    component: AuthComponent,
    pathMatch: 'full',
    canActivate: [LoginGuard],
  },
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
  },
  {
    path: 'customer',
    loadChildren: () =>
      import('./customer/customer.module').then((m) => m.CustomerModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'medical-team',
    loadChildren: () =>
      import('./medical/medical.module').then((m) => m.MedicalModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'chat',
    loadChildren: () =>
      import('./chat/chat.module').then((m) => m.ChatModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'team-board',
    component: TeamBoardComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
  },
  {
    path: 'team-board/medical-team',
    component: ViewMedicalComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
  },
  {
    path: 'patients',
    loadChildren: () =>
      import('./patient/patient.module').then((m) => m.PatientModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'team-invitation',
    component: TeamInvitationComponent,
    pathMatch: 'full',
  },
  {
    path: 'assignments',
    loadChildren: () =>
      import('./assignment/assignment.module').then((m) => m.AssignmentModule),
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
