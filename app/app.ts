import { Component, ViewChild } from '@angular/core';
import { Events, ionicBootstrap, MenuController, Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { Http } from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { AuthService } from './services/auth';
import { DeliveryData } from './providers/delivery-data';
import { TabsPage } from './pages/tabs/tabs';
import { HomePage } from './pages/home/home';
import { TasksPage } from './pages/tasks/tasks';
import { ShiftsPage } from './pages/shifts/shifts';
import { UserPage } from './pages/user/user';

// maps api key ios AIzaSyCfZs1op2mxz8ccYaxK-1rHM76xEKDulc4
// map api key android  AIzaSyCAS2mmMbeDNeXLKC6EpMlNbujnwhxEm4g
// cordova plugin add cordova-plugin-googlemaps --variable API_KEY_FOR_ANDROID="AIzaSyCAS2mmMbeDNeXLKC6EpMlNbujnwhxEm4g" --variable API_KEY_FOR_IOS="AIzaSyCfZs1op2mxz8ccYaxK-1rHM76xEKDulc4"

interface PageObj {
  title?: string;
  component: any;
  icon?: string;
  index?: number;
}

// @Component({
//   template: '<ion-nav [root]="rootPage"></ion-nav>'
// })
@Component({
  templateUrl: 'build/app.html',
  providers: [ DeliveryData ]
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;

  appPages: PageObj[] = [
    { title: 'Home', component: TabsPage, index: 0, icon: 'home' },
    { title: 'Tasks', component: TabsPage, index: 1, icon: 'clipboard' },
    { title: 'Shifts', component: TabsPage, index: 2, icon: 'calendar' },
    { title: 'User', component: TabsPage, index: 3, icon: 'person' }
  ];
  rootPage: any = TabsPage;

  constructor (
    public events: Events,
    public delivData: DeliveryData,
    public menu: MenuController,
    public platform: Platform,
    public auth: AuthService
  ) {
    // Call any initial plugins when ready
    platform.ready().then(() => {
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
    // Check to see if user authenticated, if not then display auth0
    setTimeout(() => {
      if (!this.auth.authenticated()) {
        this.auth.login();
      }
    }, 0);
    this.listenToLoginEvents();
  }

   openPage(page: PageObj) {
    if (page.index) {
      this.nav.setRoot(page.component, {tabIndex: page.index});
    } else {
      this.nav.setRoot(page.component);
    }
  }

  listenToLoginEvents() {
    this.events.subscribe('user:login', () => {
    });
    this.events.subscribe('user:signup', () => {
    });
    this.events.subscribe('user:logout', () => {
      this.auth.login();
    });
  }

}

ionicBootstrap(MyApp, [DeliveryData, {provide:AuthHttp,
    useFactory: (http) => {
      return new AuthHttp(new AuthConfig({noJwtError: true}), http);
    },
    deps: [Http]
  },
  AuthService], { });