import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddJobPostComponent } from './add-job-post/add-job-post.component';

const routes: Routes = [
  // { path: '', component: JobPortalListComponent, pathMatch: 'full' },
  { path: 'add', component: AddJobPostComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JobPostRoutingModule {}
