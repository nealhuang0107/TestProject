import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { API, MyDevice, Depart, Doctor, Patient } from './services/public/common/api.service';
import { IonicStorageModule } from '@ionic/storage';
import { HttpClientModule } from '@angular/common/http';
import { RecaptchaModule } from 'ng-recaptcha';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
//import { ServiceWorkerModule } from '@angular/service-worker';
//import { environment } from '../environments/environment';


@NgModule({
    declarations: [AppComponent],
    entryComponents: [],
    imports: [BrowserModule, IonicModule.forRoot({ mode: 'md' }), AppRoutingModule,
        HttpClientModule, IonicStorageModule.forRoot(),
        RecaptchaModule,
        ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
        //ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    ],
    providers: [
        StatusBar,
        SplashScreen,
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
        API, MyDevice, Depart, Doctor, Patient,
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
