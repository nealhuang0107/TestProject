import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppDeployPage } from './app-deploy.page';

const routes: Routes = [
  {
    path: '',
    component: AppDeployPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppDeployPageRoutingModule {}
