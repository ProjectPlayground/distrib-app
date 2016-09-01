import { Component } from '@angular/core';
import { AlertController, App, ItemSliding, List, NavController, NavParams } from 'ionic-angular';
import { UserData } from '../../providers/user-data';
import { DeliveryData } from '../../providers/delivery-data';

@Component({
  templateUrl: 'build/pages/task/task.html',
})
export class TaskPage {

  alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  task: any;

  constructor (
    public alertCtrl: AlertController,
    public app: App,
    public navParams: NavParams,
    public navCtrl: NavController,
    public delivData: DeliveryData,
    public user: UserData
  ) { 
  	this.task = this.navParams.data;
  	console.log(this.task);
  }


}
