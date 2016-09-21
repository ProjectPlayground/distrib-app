import { Component, ViewChild } from '@angular/core';
import { Events, ionicBootstrap, MenuController, Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { Http } from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { AuthService } from './services/auth';
import { DeliveryData } from './providers/delivery-data';
import { TabsPage } from './pages/tabs/tabs';
import { UserPage } from './pages/user/user';
import { TasksPage } from './pages/tasks/tasks';
import { ShiftsPage } from './pages/shifts/shifts';
import { AuthPage } from './pages/auth/auth';

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

  pages: PageObj[] = [
    { title: 'Tasks', component: TasksPage, icon: 'clipboard' },
  ];
  appPages: PageObj[] = [
    { title: 'Task', component: TabsPage, index: 0, icon: 'navigate' },
    { title: 'Tasks', component: TabsPage, index: 1, icon: 'clipboard' },
    { title: 'Shifts', component: TabsPage, index: 2, icon: 'calendar' }
  ];
  loggedInPages: PageObj[] = [
    { title: 'Account', component: UserPage, icon: 'person' },
    { title: 'Shifts', component: ShiftsPage, icon: 'calendar' },
  ];
  loggedOutPages: PageObj[] = [
  ];
  rootPage: any = AuthPage;

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
    // decide which menu items should be hidden by current login status stored in local storage
    setTimeout(() => { 
      if (this.auth.authenticated()) {
        this.enableMenu(true);
      } else {
        this.enableMenu(false);
      }
    }, 1);
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
      this.nav.setRoot(ShiftsPage);
      this.enableMenu(true);
    });

    this.events.subscribe('user:signup', () => {
      this.enableMenu(true);
    });

    this.events.subscribe('user:logout', () => {
      this.nav.setRoot(AuthPage);
      this.enableMenu(false);
    });
  }

  enableMenu(loggedIn) {
    this.menu.enable(loggedIn, 'loggedInMenu');
    this.menu.enable(!loggedIn, 'loggedOutMenu');
  }

}

ionicBootstrap(MyApp, [DeliveryData, {provide:AuthHttp,
    useFactory: (http) => {
      return new AuthHttp(new AuthConfig({noJwtError: true}), http);
    },
    deps: [Http]
  },
  AuthService], { });