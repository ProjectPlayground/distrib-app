import { Component } from '@angular/core';
import { NavParams, ViewController, AlertController } from 'ionic-angular';
import moment from 'moment';

@Component({
  selector: 'page-shifts-filter',
  templateUrl: 'shifts-filter.html'
})
export class ShiftsFilterPage {

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

}