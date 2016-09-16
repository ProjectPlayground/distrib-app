import { Component } from '@angular/core';
import { AlertController, App, ItemSliding, List, NavController } from 'ionic-angular';
import { UserData } from '../../providers/user-data';
import { DeliveryData } from '../../providers/delivery-data';

@Component({
  templateUrl: 'build/pages/distrib/distrib.html',
})
export class DistribPage {

  currentShift: any = {};
  currentTask: any = {};
  shiftComplete = false;
  alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  constructor (
    public alertCtrl: AlertController,
    public app: App,
    public navCtrl: NavController,
    public delivData: DeliveryData,
    public user: UserData
  ) { }

	ngOnInit() {
    this.getCurrentShift();
  }

  refresh(refresher) {
    this.getCurrentShift();
    setTimeout(() => {
      refresher.complete();
    }, 1000);
  }

  getCurrentShift() {
    this.delivData.getShifts({start: new Date()})
    .subscribe(data => {
      this.currentShift = data[0];    
      this.getCurrentTask();
    }, err => {
      this.handleError(err);
    });
  }

  getCurrentTask() {
  	for (let i = 0; i < this.currentShift.waypoints.length; i++) {
  		let task = this.currentShift.waypoints[i];
  		if ( task.status === "active") { 
  			this.currentTask = task; 
  			return;
  		} else if (task.status==="incomplete") {
  			this.currentTask = task; 
  			return;
  		}
  	}
  	this.shiftComplete = true;
  }

  getMinutes(seconds) {
    return Math.round(seconds/60);
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
