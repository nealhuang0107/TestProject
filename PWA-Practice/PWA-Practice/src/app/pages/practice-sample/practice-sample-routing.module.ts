import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PracticeSamplePage } from './practice-sample.page';

const routes: Routes = [
  {
    path: '',
    component: PracticeSamplePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PracticeSamplePageRoutingModule {}
