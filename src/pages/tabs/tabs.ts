import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { TasksPage } from '../tasks/tasks';
import { ShiftsPage } from '../shifts/shifts';
import { UserPage } from '../user/user';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tab1Root: any = HomePage;
  tab2Root: any = TasksPage;
  tab3Root: any = ShiftsPage;
  tab4Root: any = UserPage;
  selectedIndex: number;

  constructor(navParams: NavParams) {
  	this.selectedIndex = navParams.data.tabIndex || 0;
  }
}