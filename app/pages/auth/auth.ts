import { Component, ViewChild } from '@angular/core';
import { Events, NavController, Nav } from 'ionic-angular';
import { AuthService } from '../../services/auth';
import { ShiftsPage } from '../shifts/shifts';

@Component({
  templateUrl: 'build/pages/auth/auth.html',
})
export class AuthPage {

  constructor(private navCtrl: NavController, private auth: AuthService, private events: Events) { 
  }

}