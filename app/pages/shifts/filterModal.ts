import { Component } from '@angular/core';
import { NavParams, ViewController, AlertController } from 'ionic-angular';
import * as moment from 'moment';

@Component({
  templateUrl: 'build/pages/shifts/filterModal.html'
})
export class filterModal {

  filters: any = {};
  filterStart: string;
  filterEnd: string;

  constructor(
    public alert: AlertController, 
    public viewCtrl: ViewController,
    public navParams: NavParams
  ) {
    this.filters = navParams.data;
    this.filterStart = moment(this.filters.start).format('YYYY-MM-DDTHH:mmZ');
    this.filterEnd = moment(this.filters.end).format('YYYY-MM-DDTHH:mmZ');
  }

  done() {
    this.filters.start = new Date(new Date(this.filterStart).setHours(0,0,0,0));
    this.filters.end = new Date(new Date(this.filterEnd).setHours(23,59,0,0));
    this.viewCtrl.dismiss(this.filters);
  }

  error(err?) {
    let alert = this.alert.create({
      title: 'Error creating shift',
      subTitle: err || 'Please fill in all required fields',
      buttons: ['OK']
    });
    alert.present();
  }

}