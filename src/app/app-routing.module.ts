import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './shared/authguard/auth.guard';
import { LoginGuard } from './shared/loginguard/login.guard';
import { TeamBoardComponent } from './team-board/team-board.component';
import { ViewMedicalComponent } from './view-medical/view-medical.component';
import { TeamInvitationComponent } from './team-invitation/team-invitation.component';
import { PermissionGuard } from './shared/authguard/permission.guard';
import { ManagePermissionsComponent } from './manage-permissions/manage-permissions.component';
import { CompanyAdvComponent } from './company-adv/company-adv.component';
import { PrfilePreviewPopupComponent } from './company-adv/prfile-preview-popup/prfile-preview-popup.component';
//import { DocumentComponent } from './document/document.component';
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
    canActivate: [AuthGuard, PermissionGuard],
    data: { permission: 'Customer', type: 'canView' }
  },
  {
    path: 'medical-team',
    loadChildren: () =>
      import('./medical/medical.module').then((m) => m.MedicalModule),
    canActivate: [AuthGuard, PermissionGuard],
    data: { permission: 'Medical Team', type: 'canView' }
  },
  {
    path: 'chat',
    loadChildren: () => import('./new-chat/new-chat.module').then((m) => m.NewChatModule),
    data: { permission: 'Chat', type: 'canView' },
    canActivate: [AuthGuard, PermissionGuard],
  },
  // {
  //   path: 'new-chat',
  //   loadChildren: () => import('./new-chat/new-chat.module').then((m) => m.NewChatModule),
  //   canActivate: [AuthGuard],
  // },
  {
    path: 'team-board',
    component: TeamBoardComponent,
    pathMatch: 'full',
    data: { permission: 'Medical Team Board', type: 'canView' },
    canActivate: [AuthGuard, PermissionGuard],
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
    data: { permission: 'Patients', type: 'canView' },
    canActivate: [AuthGuard, PermissionGuard],
  },
  {
    path: 'assignments',
    loadChildren: () =>
      import('./assignment/assignment.module').then((m) => m.AssignmentModule),
    data: { permission: 'Assignment', type: 'canView' },
    canActivate: [AuthGuard, PermissionGuard],
  },
  {
    path: 'ambulance',
    loadChildren: () =>
      import('./ambulance/ambulance.module').then((m) => m.AmbulanceModule),
    data: { permission: 'Ambulance', type: 'canView' },
    canActivate: [AuthGuard, PermissionGuard],
  },
  {
    path: 'driver',
    loadChildren: () =>
      import('./driver/driver.module').then((m) => m.DriverModule),
    data: { permission: 'Driver', type: 'canView' },
    canActivate: [AuthGuard, PermissionGuard],
  },
  {
    path: 'job-portal',
    loadChildren: () =>
      import('./job-portal/job-portal.module').then((m) => m.JobPortalModule),
    data: { permission: 'Medical Facilities', type: 'canView' },
    canActivate: [AuthGuard, PermissionGuard],
  },
  {
    path: 'medical-facility',
    loadChildren: () =>
      import('./living/living.module').then((m) => m.LivingModule),
    data: { permission: 'Medical Facility Board', type: 'canView' },
    canActivate: [AuthGuard, PermissionGuard],
  },
  {
    path: 'job-post',
    loadChildren: () =>
      import('./job-post/job-post.module').then((m) => m.JobPostModule),
    data: { permission: "Field Openings", type: 'canView' },
    canActivate: [AuthGuard, PermissionGuard],
  },
  {
    path: 'team-invitation',
    component: TeamInvitationComponent,
    pathMatch: 'full',
  },
  {
    path: 'manage-permissions',
    component: ManagePermissionsComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: 'company/home',
    component: CompanyAdvComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: 'profile',
    component: CompanyAdvComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: 'profile/preview',
    component: PrfilePreviewPopupComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  // {
  //   path: 'dashboard2',
  //   component: Dashboard2Component,
  //   canActivate: [AuthGuard],
  // },
  //   {
  //     path: 'document',
  //     component : DocumentComponent,
  //   },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
