import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the TasksDetail page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-tasks-detail',
  templateUrl: 'tasks-detail.html'
})
export class TasksDetail {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello TasksDetail Page');
  }

}
