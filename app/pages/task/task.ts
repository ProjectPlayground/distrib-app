import { Component } from '@angular/core';
import { AlertController, App, ItemSliding, List, NavController } from 'ionic-angular';
import { DeliveryData } from '../../providers/delivery-data';

@Component({
  templateUrl: 'build/pages/task/task.html',
})
export class TaskPage {

  currentShift: any = {};
  currentTask: any = {};
  
  alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  shiftComplete = false;

  constructor (
    public alertCtrl: AlertController,
    public app: App,
    public navCtrl: NavController,
    public delivData: DeliveryData
  ) { }

	ngOnInit() {
    // this.getCurrentShift();
  }

  // getCurrentShift(refresher?) {
  //   this.delivData.getCurrentShift()
  //   .subscribe(data => {
  //     this.currentShift = data;
  //     this.getCurrentTask();
  //   }, err => {
  //     this.handleError(err);
  //   }, () => {
  //     if (refresher) {
  //       refresher.complete();
  //     };
  //   });
  // }

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
