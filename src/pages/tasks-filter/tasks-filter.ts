import { Component } from '@angular/core';
import { NavParams, ViewController, AlertController } from 'ionic-angular';

@Component({
  selector: 'page-tasks-filter',
  templateUrl: 'tasks-filter.html'
})
export class TasksFilterPage {

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