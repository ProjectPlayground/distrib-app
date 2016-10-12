import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the ShiftsDetail page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-shifts-detail',
  templateUrl: 'shifts-detail.html'
})
export class ShiftsDetail {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello ShiftsDetail Page');
  }

}
