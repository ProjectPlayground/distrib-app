import { Component, ViewChild } from '@angular/core';
import { Events, ionicBootstrap, MenuController, Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { Http } from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { AuthService } from './services/auth/auth';
import { DeliveryData } from './providers/delivery-data';
import { UserData } from './providers/user-data';
import { TabsPage } from './pages/tabs/tabs';
import { UserPage } from './pages/user/user';
import { TasksPage } from './pages/tasks/tasks';
import { ShiftsPage } from './pages/shifts/shifts';

// maps api key ios AIzaSyCfZs1op2mxz8ccYaxK-1rHM76xEKDulc4
// map api key android  AIzaSyCAS2mmMbeDNeXLKC6EpMlNbujnwhxEm4g
// cordova plugin add cordova-plugin-googlemaps --variable API_KEY_FOR_ANDROID="AIzaSyCAS2mmMbeDNeXLKC6EpMlNbujnwhxEm4g" --variable API_KEY_FOR_IOS="AIzaSyCfZs1op2mxz8ccYaxK-1rHM76xEKDulc4"

interface PageObj {
  title: string;
  component: any;
  icon: string;
  index?: number;
}

// @Component({
//   template: '<ion-nav [root]="rootPage"></ion-nav>'
// })
@Component({
  templateUrl: 'build/app.html',
  providers: [ UserData, DeliveryData ]
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;

  pages: PageObj[] = [
    { title: 'Distrib', component: TasksPage, icon: 'car' },
    { title: 'Shifts', component: ShiftsPage, icon: 'calendar' }
  ];
  appPages: PageObj[] = [
    { title: 'Distrib', component: TabsPage, index: 0, icon: 'clipboard' },
    { title: 'Tasks', component: TabsPage, index: 1, icon: 'navigate' },
    { title: 'Shifts', component: TabsPage, index: 2, icon: 'calendar' }
  ];
  loggedInPages: PageObj[] = [
    { title: 'Account', component: TabsPage, icon: 'person' },
    { title: 'Shifts', component: ShiftsPage, icon: 'calendar' }
  ];
  loggedOutPages: PageObj[] = [
    { title: 'Login', component: UserPage, icon: 'log-in' }
  ];
  rootPage: any = ShiftsPage;

  constructor (
    public events: Events,
    public userData: UserData,
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
    this.userData.hasLoggedIn().then((hasLoggedIn) => {
      this.enableMenu(hasLoggedIn === 'true');
    });

    this.listenToLoginEvents();
  }

  login() {
    this.enableMenu(true);
  }

  openPage(page: PageObj) {
    if (page.index) {
      this.nav.setRoot(page.component, {tabIndex: page.index});
    } else {
      this.nav.setRoot(page.component);
    }
    if (page.title === 'Logout') {
      // Give the menu time to close before changing to logged out
      setTimeout(() => {
        this.userData.logout();
      }, 1000);
    }
  }

  listenToLoginEvents() {
    this.events.subscribe('user:login', () => {
      this.enableMenu(true);
    });

    this.events.subscribe('user:signup', () => {
      this.enableMenu(true);
    });

    this.events.subscribe('user:logout', () => {
      this.enableMenu(false);
    });
  }

  enableMenu(loggedIn) {
    this.menu.enable(loggedIn, 'loggedInMenu');
    this.menu.enable(!loggedIn, 'loggedOutMenu');
  }

}

ionicBootstrap(MyApp, [DeliveryData, UserData, {provide:AuthHttp,
    useFactory: (http) => {
      return new AuthHttp(new AuthConfig({noJwtError: true}), http);
    },
    deps: [Http]
  },
  AuthService], { });