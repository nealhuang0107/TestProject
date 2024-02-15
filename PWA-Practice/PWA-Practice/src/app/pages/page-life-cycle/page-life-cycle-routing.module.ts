import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageLifeCyclePage } from './page-life-cycle.page';

const routes: Routes = [
  {
    path: '',
    component: PageLifeCyclePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PageLifeCyclePageRoutingModule {}
