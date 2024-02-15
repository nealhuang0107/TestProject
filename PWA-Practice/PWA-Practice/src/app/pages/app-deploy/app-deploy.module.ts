import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AppDeployPageRoutingModule } from './app-deploy-routing.module';

import { AppDeployPage } from './app-deploy.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AppDeployPageRoutingModule
  ],
  declarations: [AppDeployPage]
})
export class AppDeployPageModule {}
