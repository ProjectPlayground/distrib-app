import { Component } from '@angular/core';
import { AlertController, NavController, NavParams } from 'ionic-angular';
import { DeliveryData } from '../../providers/delivery-data';

@Component({
  selector: 'page-shifts-detail',
  templateUrl: 'shifts-detail.html'
})
export class ShiftsDetailPage {
  shift: any = {};
  billableTime;
  travelTime;
  constructor (
  	public navCtrl: NavController, 
  	public navParams: NavParams,
  	public delivData: DeliveryData,
  	public alertCtrl: AlertController
  ) {
  	this.shift = navParams.data;
    this.billableTime = Math.round(this.shift.stats.totalBillableTime/60);
    this.travelTime = Math.round(this.shift.stats.totalTravelTime/60);
  }

  selectShift() {
    let alert = this.alertCtrl.create({
      title: 'Select this shift?',
      buttons: ['Cancel',
      {
        text: 'Confirm',
        handler: () => {
          this.delivData.setCurrentShift(this.shift)
        }
      }]
    });
    alert.present();
  }

  deleteShift() {
    let alert = this.alertCtrl.create({
      title: 'Delete?',
      buttons: ['Cancel',
      {
        text: 'Confirm',
        handler: () => {
          this.delivData.deleteShift(this.shift)
          .subscribe(data => {
            this.navCtrl.pop();
          }, err => {
            this.handleError(err);
          });
        }
      }]
    });
    alert.present();
  }

  handleError(err) {
    let alert = this.alertCtrl.create({
      title: 'Problem with server',
      subTitle: err,
      buttons: ['OK']
    });
    alert.present();
  }
}
