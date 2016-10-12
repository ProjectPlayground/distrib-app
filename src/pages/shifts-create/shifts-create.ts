import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the ShiftsCreate page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-shifts-create',
  templateUrl: 'shifts-create.html'
})
export class ShiftsCreate {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello ShiftsCreate Page');
  }

}
