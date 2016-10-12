import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the ShiftsFilter page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-shifts-filter',
  templateUrl: 'shifts-filter.html'
})
export class ShiftsFilter {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello ShiftsFilter Page');
  }

}
