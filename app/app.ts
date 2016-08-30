import { Component, ViewChild } from '@angular/core';
import { Events, ionicBootstrap, MenuController, Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { DeliveryData } from './providers/delivery-data';
import { UserData } from './providers/user-data';
import { TabsPage } from './pages/tabs/tabs';
import { NavigationPage } from './pages/navigation/navigation';

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

  appPages: PageObj[] = [
    { title: 'Tasks', component: TabsPage, index: 0, icon: 'clipboard' },
    { title: 'Navigation', component: TabsPage, index: 1, icon: 'navigate' },
    { title: 'Shifts', component: TabsPage, index: 2, icon: 'calendar' }
  ];
  loggedInPages: PageObj[] = [
    { title: 'Account', component: TabsPage, icon: 'person' },
    { title: 'Logout', component: TabsPage, icon: 'log-out' }
  ];
  loggedOutPages: PageObj[] = [
    { title: 'Login', component: TabsPage, icon: 'log-in' },
  ];
  rootPage: any = TabsPage;

  constructor (
    public events: Events,
    public userData: UserData,
    public menu: MenuController,
    platform: Platform,
    delivData: DeliveryData
  ) {
    // Call any initial plugins when ready
    platform.ready().then(() => {
      StatusBar.styleDefault();
      Splashscreen.hide();
    });

    this.enableMenu(true);

    // decide which menu items should be hidden by current login status stored in local storage
    this.userData.hasLoggedIn().then((hasLoggedIn) => {
      this.enableMenu(hasLoggedIn === 'true');
    });

    this.listenToLoginEvents();
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

ionicBootstrap(MyApp, [DeliveryData, UserData], { });