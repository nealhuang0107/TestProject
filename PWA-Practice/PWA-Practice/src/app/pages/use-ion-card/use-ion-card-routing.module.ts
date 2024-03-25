import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UseIonCardPage } from './use-ion-card.page';

const routes: Routes = [
  {
    path: '',
    component: UseIonCardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UseIonCardPageRoutingModule {}
