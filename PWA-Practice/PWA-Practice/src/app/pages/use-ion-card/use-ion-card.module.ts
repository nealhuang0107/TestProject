import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UseIonCardPageRoutingModule } from './use-ion-card-routing.module';

import { UseIonCardPage } from './use-ion-card.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UseIonCardPageRoutingModule
  ],
  declarations: [UseIonCardPage]
})
export class UseIonCardPageModule {}
