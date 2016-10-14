import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthService } from '../../providers/auth';
import { TabsPage } from '../tabs/tabs';

@Component({
  selector: 'page-auth',
  templateUrl: 'auth.html'
})
export class AuthPage {

  constructor(public navCtrl: NavController, public auth: AuthService) {

  }

  ionViewWillEnter() {
    // check if user authenticated
    if (this.auth.authenticated()) {
      this.navCtrl.setRoot(TabsPage);
    } else {
      this.auth.login();
    }
  }

}