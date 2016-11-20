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
  taskIndex;
  taskStatus;
  
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

  startTask() {
    let alert = this.alertCtrl.create({
    title: 'Are you sure?',
      buttons: ['Cancel',
      {
        text: 'Confirm',
        handler: () => {
          if (this.currentTask.activity == 'pickup') {
            this.updateOrder('in-transit'); // update order status only if pickup
          }
          this.updateWaypoint('active');
        }
      }]
    });
    alert.present();
  }

  completeTask() {
    let alert = this.alertCtrl.create({
      title: 'Are you sure?',
      buttons: ['Cancel',
      {
        text: 'Confirm',
        handler: () => {
          if (this.currentTask.activity == 'delivery') {
            this.updateOrder('delivered'); // update order status only if delivery
          }
          this.updateWaypoint('complete');
        }
      }]
    });
    alert.present();
  }

  // sets all orders in currentTask orders status to status
  updateOrder(status) {
    for (var i = 0; i < this.currentTask.orders.length; i++) {
      this.delivData.orderStatus(this.currentTask.orders[i], status)
      .subscribe(data => {
        let alert = this.alertCtrl.create({
          title: 'Order status',
          subTitle: 'Set order #'+data._id+' status to '+data.status,
          buttons: ['Ok']
        });
        alert.present();
      }, err => {
        this.handleError(err);
      });  
    }
  }

  // sets waypoint status to status
  updateWaypoint(status) {
    this.delivData.waypointStatus(this.currentShift, this.currentTask, status)
    .subscribe(data => {
      this.taskStatus = status;
    }, err => {
      this.handleError(err);
    });
  }

  getGoogleMapsURL() {
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

