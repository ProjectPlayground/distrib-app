import { Component, ViewChild } from '@angular/core';
import { Events, Nav, Platform } from 'ionic-angular';

import { TabsPage } from '../pages/tabs/tabs';

import { AuthService } from '../providers/auth';
import { DeliveryData } from '../providers/delivery-data';

@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`
})
export class MyApp {

	@ViewChild(Nav) nav: Nav;

  appPages: [
    { title: 'Home', component: TabsPage, index: 0, icon: 'home' },
    { title: 'Tasks', component: TabsPage, index: 1, icon: 'clipboard' },
    { title: 'Shifts', component: TabsPage, index: 2, icon: 'calendar' },
    { title: 'User', component: TabsPage, index: 3, icon: 'person' }
  ];
  rootPage = TabsPage;

  constructor (
    public events: Events,
    public delivData: DeliveryData,
    public platform: Platform,
    public auth: AuthService
  ) {
    // Call any initial plugins when ready
    platform.ready().then(() => {
      // StatusBar.styleDefault();
      // Splashscreen.hide();
    });
    // Check to see if user authenticated, if not then display auth0
    setTimeout(() => {
      if (!this.auth.authenticated()) {
        this.auth.login();
      }
    }, 0);
    this.listenToLoginEvents();
  }

 	openPage(page) {
    if (page.index) {
      this.nav.setRoot(page.component, {tabIndex: page.index});
    } else {
      this.nav.setRoot(page.component);
    }
  }

  listenToLoginEvents() {
    this.events.subscribe('user:login', () => {
      this.nav.setRoot(TabsPage);
    });
    this.events.subscribe('user:signup', () => {
    });
    this.events.subscribe('user:logout', () => {
      this.auth.login();
    });
  }

}
