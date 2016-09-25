import { Component } from '@angular/core';
import { AlertController, NavController, NavParams } from 'ionic-angular';
import { DeliveryData } from '../../providers/delivery-data';
import { TasksPage } from '../tasks/tasks';

@Component({
  templateUrl: 'build/pages/shift/shift.html',
})
export class ShiftPage {
  shift: any = {};
  constructor (
  	public navCtrl: NavController, 
  	public navParams: NavParams,
  	public delivData: DeliveryData,
  	public alertCtrl: AlertController
  ) {
  	this.shift = navParams.data;
  }

  activeShift() {

  }

  completeShift() {
    
  }

  selectShift() {
    let alert = this.alertCtrl.create({
      title: 'View this shift?',
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
