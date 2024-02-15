import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PageLifeCyclePageRoutingModule } from './page-life-cycle-routing.module';

import { PageLifeCyclePage } from './page-life-cycle.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PageLifeCyclePageRoutingModule
  ],
  declarations: [PageLifeCyclePage]
})
export class PageLifeCyclePageModule {}
