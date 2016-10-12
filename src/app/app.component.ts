import { Component, ViewChild } from '@angular/core';
import { Events, Nav, Platform } from 'ionic-angular';
import { StatusBar } from 'ionic-native';

import { TabsPage } from '../pages/tabs/tabs';

import { AuthService } from '../providers/auth';
import { DeliveryData } from '../providers/delivery-data';

@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`
})
export class MyApp {

	@ViewChild(Nav) nav: Nav;

  rootPage = TabsPage;

  constructor (
    public platform: Platform,
    public events: Events,
    public auth: AuthService,
    public delivData: DeliveryData
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
    // Check to see if user authenticated, if not then display auth0
    setTimeout(() => {
      if (!this.auth.authenticated()) {
        this.auth.login();
      }
    }, 0);
    this.listenToLoginEvents();
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
