import { Component } from '@angular/core';
import { AlertController, App, ItemSliding, List, ModalController, NavController, LoadingController } from 'ionic-angular';
import { UserData } from '../../providers/user-data';
import { DeliveryData } from '../../providers/delivery-data';
import { ShiftPage } from '../../pages/shift/shift';
import { createModal } from './createModal';
import { filterModal } from './filterModal';

@Component({
  templateUrl: 'build/pages/shifts/shifts.html',
})
export class ShiftsPage {

  shifts: any = [];
  currentShift: any = {};
  segment = 'current';
  filters = {
    start: new Date(new Date().setHours(0,0,0,0)),
    end: new Date(new Date().setHours(47,59,0,0))
  };

  constructor (
    public alertCtrl: AlertController,
    public app: App,
    public load: LoadingController,
    public modalCtrl: ModalController,
    public navCtrl: NavController,
    public delivData: DeliveryData,
    public user: UserData
  ) { }

	ngOnInit() {
    this.getShifts();
	}

  filterChange() {
    let modal = this.modalCtrl.create(filterModal, this.filters);
    modal.present();
    modal.onDidDismiss((data) => {
      if (data) {
        this.filters = data;
        this.getShifts();
      }
    });
  }

  viewShift(shift) {
    this.user.setCurrentShift(this.shifts[0]);
    this.navCtrl.push(ShiftPage, shift);
  }

  getShifts() {
  	this.delivData.getShifts(this.filters)
  	.subscribe(data => {
      this.shifts = data;
      this.currentShift = data[0];
  	}, err => {
      this.handleError(err);
    });
  }

  refreshShifts(refresher) {
    this.getShifts();
    setTimeout(() => {
      refresher.complete();
    }, 1000);
  }

  addShift() {
    let modal = this.modalCtrl.create(createModal);
    modal.present();
    modal.onDidDismiss((data: any[]) => {
      this.getShifts();
    });
  }

  deleteShift(shift) {
    let alert = this.alertCtrl.create({
      title: 'Delete?',
      buttons: ['Cancel',
      {
        text: 'Confirm',
        handler: () => {
          this.delivData.deleteShift(shift)
          .subscribe(data => {
            this.getShifts();
          }, err => {
            this.handleError(err);
          });
        }
      }]
    });
    alert.present();
  }

  handleError(err) {
    let alert = this.alertCtrl.create({
      title: 'Problem with server',
      subTitle: err,
      buttons: ['OK']
    });
    alert.present();
  }

}