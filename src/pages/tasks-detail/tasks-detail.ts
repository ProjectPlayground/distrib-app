import { Component } from '@angular/core';
import { AlertController, App, NavController, NavParams } from 'ionic-angular';
import { DeliveryData } from '../../providers/delivery-data';

@Component({
  selector: 'page-tasks-detail',
  templateUrl: 'tasks-detail.html'
})
export class TasksDetailPage {

  currentShift: any = {};
  currentTask: any = {};
  taskStatus;
  taskIndex;
  
  alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  shiftComplete = false;

  constructor (
    public alertCtrl: AlertController,
    public app: App,
    public navCtrl: NavController,
    public delivData: DeliveryData,
    public navParams: NavParams
  ) { 
    this.currentShift = navParams.data.shift;
    this.currentTask = navParams.data.task;
    this.taskIndex = navParams.data.index;
    this.taskStatus = navParams.data.task.status;
  }

  waypointStatus(status) {
    let alert = this.alertCtrl.create({
      title: 'Are you sure?',
      buttons: ['Cancel',
      {
        text: 'Confirm',
        handler: () => {
          this.delivData.waypointStatus(this.currentShift, this.currentTask, status)
          .subscribe(data => {
            this.taskStatus = status;
          }, err => {
            this.handleError(err);
          });
        }
      }]
    });
    alert.present();
  }

  getGoogleMapsURL(address) {
    return 'https://www.google.ca/maps/place/' +
      this.currentTask.address.address1 + ',' +
      this.currentTask.address.city + ',' +
      this.currentTask.address.postal;
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

