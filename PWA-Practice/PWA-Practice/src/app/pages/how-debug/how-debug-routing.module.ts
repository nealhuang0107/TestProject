import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HowDebugPage } from './how-debug.page';

const routes: Routes = [
  {
    path: '',
    component: HowDebugPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HowDebugPageRoutingModule {}
