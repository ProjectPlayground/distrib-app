import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthService } from '../../services/auth';

@Component({
  templateUrl: 'build/pages/auth/auth.html',
})
export class AuthPage {

  constructor(private navCtrl: NavController, private auth: AuthService) {
  }

  ionViewLoaded() {
  	this.auth.login();
  }

}
