import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the TasksFilter page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-tasks-filter',
  templateUrl: 'tasks-filter.html'
})
export class TasksFilter {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello TasksFilter Page');
  }

}
