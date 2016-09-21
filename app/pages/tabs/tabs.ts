import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { TaskPage } from '../task/task';
import { TasksPage } from '../tasks/tasks';
import { ShiftsPage } from '../shifts/shifts';

@Component({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {
  tab1Root: any = TaskPage;
  tab2Root: any = TasksPage;
  tab3Root: any = ShiftsPage;
  selectedIndex: number;

  constructor(navParams: NavParams) {
    this.selectedIndex = navParams.data.tabIndex || 0;
  }

}