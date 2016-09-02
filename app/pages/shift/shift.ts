import { Component } from '@angular/core';
import { AlertController, NavController, App, NavParams } from 'ionic-angular';
import { UserData } from '../../providers/user-data';
import { DeliveryData } from '../../providers/delivery-data';
/*
  Generated class for the ShiftPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/shift/shift.html',
})
export class ShiftPage {

  currentShift: any = {};

  constructor (
    public app: App,
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public delivData: DeliveryData,
    public user: UserData,
    public navParams: NavParams
  ) { }

  // ngOnInit() {
  // 	this.currentShift = this.navParams.data;
  //   this.user.setCurrentShift(currentShift);
  // }

	// getCurrentShift() {
 //    this.delivData.getShifts({start: new Date()})
 //    .subscribe(data => {
 //      this.currentShift = data[0];
 //    }, err => {
 //    	handleError(err);
 //    });
 //  }

  // handleError(err) {
  //   let alert = this.alertCtrl.create({
  //     title: 'Problem with server',
  //     subTitle: err,
  //     buttons: ['OK']
  //   });
  //   alert.present();
  // }

}
