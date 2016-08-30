import { Component } from '@angular/core';
import { AlertController, App, ItemSliding, List, ModalController, NavController } from 'ionic-angular';
import { UserData } from '../../providers/user-data';
import { DeliveryData } from '../../providers/delivery-data';

@Component({
  templateUrl: 'build/pages/tasks/tasks.html',
})
export class TasksPage {

  currentShift: any = 'none';
  currentTask = {};

  constructor (
    public alertCtrl: AlertController,
    public app: App,
    public modalCtrl: ModalController,
    public navCtrl: NavController,
    public delivData: DeliveryData,
    public user: UserData
  ) { }

  ngOnInit() {

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