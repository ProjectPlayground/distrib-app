import {Component} from '@angular/core';
import { NavParams } from 'ionic-angular';
import { TasksPage } from '../tasks/tasks';
import { NavigationPage } from '../navigation/navigation';
import { ShiftsPage } from '../shifts/shifts';

@Component({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {
  tab1Root: any = TasksPage;
  tab2Root: any = NavigationPage;
  tab3Root: any = ShiftsPage;
  selectedIndex: number;

  constructor(navParams: NavParams) {
    this.selectedIndex = navParams.data.tabIndex || 0;
  }

}