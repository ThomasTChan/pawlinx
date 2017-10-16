import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { ProfilePage } from '../pages/profile/profile';
import { WelcomePage } from '../pages/welcome/welcome';

import { EstimoteBeacons } from '@ionic-native/estimote-beacons';
import { IBeacon } from '@ionic-native/ibeacon';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { BeaconsProvider } from '../providers/beacons/beacons';
import { PawsDatastoreProvider } from '../providers/paws-datastore/paws-datastore';

import { ComponentsModule } from '../components/components.module';
import { EstimoteBeaconsProvider } from '../providers/estimote-beacons/estimote-beacons';
import { IbeaconsProvider } from '../providers/ibeacons/ibeacons';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    ProfilePage,
    WelcomePage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    ComponentsModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    ProfilePage,
    WelcomePage
  ],
  providers: [
    IBeacon,
    EstimoteBeacons,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    BeaconsProvider,
    PawsDatastoreProvider,
    EstimoteBeaconsProvider,
    IbeaconsProvider    
  ]
})
export class AppModule {}
