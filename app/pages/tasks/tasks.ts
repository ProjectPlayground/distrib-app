import { Component } from '@angular/core';
import { AlertController, App, ItemSliding, List, ModalController, NavController } from 'ionic-angular';
import { UserData } from '../../providers/user-data';
import { DeliveryData } from '../../providers/delivery-data';

@Component({
  templateUrl: 'build/pages/tasks/tasks.html',
})
export class TasksPage {

  currentShift: any = {};
  currentTask: any = {};
  alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  constructor (
    public alertCtrl: AlertController,
    public app: App,
    public modalCtrl: ModalController,
    public navCtrl: NavController,
    public delivData: DeliveryData,
    public user: UserData
  ) { }

  ngOnInit() {
    this.getCurrentShift();
  }

  refreshShift(refresher) {
    this.getCurrentShift();
    setTimeout(() => {
      refresher.complete();
    }, 1000);
  }


  getCurrentShift() {
    this.delivData.getShifts({start: new Date()})
    .subscribe(data => {
      this.currentShift = data[0];
      console.log(this.currentShift);
    }, err => {
      this.handleError(err);
    });
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