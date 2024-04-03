import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LivingListComponent } from './living-list/living-list.component';
import { AddLivingComponent } from './add-living/add-living.component';
import { LivingBoardComponent } from './living-board/living-board.component';

const routes: Routes = [
  { path: '', component: LivingBoardComponent, pathMatch: 'full' },
  { path: 'add', component: AddLivingComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LivingRoutingModule {}
