import {Component} from '@angular/core';
import { NavParams } from 'ionic-angular';
import { DistribPage } from '../distrib/distrib';
import { TasksPage } from '../tasks/tasks';
import { ShiftsPage } from '../shifts/shifts';

@Component({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {
  tab1Root: any = DistribPage;
  tab2Root: any = TasksPage;
  tab3Root: any = ShiftsPage;
  selectedIndex: number;

  constructor(navParams: NavParams) {
    this.selectedIndex = navParams.data.tabIndex || 0;
  }

}