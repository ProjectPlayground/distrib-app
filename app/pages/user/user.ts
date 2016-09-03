import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {AuthService} from '../../services/auth/auth';


@Component({
  templateUrl: 'build/pages/user/user.html',
})
export class UserPage {

  constructor(private navCtrl: NavController, private auth: AuthService) {

  }

}