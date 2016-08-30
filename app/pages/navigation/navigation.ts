import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { UserData } from '../../providers/user-data';
import { DeliveryData } from '../../providers/delivery-data';

@Component({
  templateUrl: 'build/pages/navigation/navigation.html',
})
export class NavigationPage {

  constructor (
    public navCtrl: NavController,
    public platform: Platform,
    public delivData: DeliveryData,
    public user: UserData
  ) { }

  ionViewLoaded() {
  }

}