import { Component } from '@angular/core';
import { NavParams, ViewController, AlertController } from 'ionic-angular';
import * as moment from 'moment';

@Component({
  templateUrl: 'build/pages/tasks/filterModal.html'
})
export class filterModal {

  filters: any = {};

  constructor(
    public alert: AlertController, 
    public viewCtrl: ViewController,
    public navParams: NavParams
  ) {
    this.filters = navParams.data;
  }

  done() {
    this.viewCtrl.dismiss(this.filters);
  }

}