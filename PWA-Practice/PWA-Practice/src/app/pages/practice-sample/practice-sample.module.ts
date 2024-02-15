import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PracticeSamplePageRoutingModule } from './practice-sample-routing.module';

import { PracticeSamplePage } from './practice-sample.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PracticeSamplePageRoutingModule
  ],
  declarations: [PracticeSamplePage]
})
export class PracticeSamplePageModule {}
