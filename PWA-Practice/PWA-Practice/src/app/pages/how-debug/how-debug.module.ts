import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HowDebugPageRoutingModule } from './how-debug-routing.module';

import { HowDebugPage } from './how-debug.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HowDebugPageRoutingModule
  ],
  declarations: [HowDebugPage]
})
export class HowDebugPageModule {}
