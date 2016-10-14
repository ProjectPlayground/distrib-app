import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthService } from '../../providers/auth';

@Component({
  selector: 'page-user',
  templateUrl: 'user.html'
})
export class UserPage {

  constructor(public navCtrl: NavController, public auth: AuthService) {
  	console.log(auth.user);
  }

}