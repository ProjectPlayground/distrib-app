import { Component } from '@angular/core';
import { AlertController, App, ItemSliding, List, NavController, ModalController } from 'ionic-angular';
import { DeliveryData } from '../../providers/delivery-data';
import { ShiftPage } from '../shift/shift';
import { createModal } from './createModal';
import { filterModal } from './filterModal';

@Component({
  templateUrl: 'build/pages/shifts/shifts.html',
})
export class ShiftsPage {

  shifts: any = [];
  currentShift;
  segment = 'current';
  filters = {
    start: new Date(new Date().setHours(0,0,0,0)),
    end: new Date(new Date().setHours(95,59,0,0))
  };

  constructor (
    public app: App,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController,
    public navCtrl: NavController,
    public delivData: DeliveryData
  ) { }

	ionViewWillEnter() {
    this.getShifts();
    this.getCurrentShift();
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

  getCurrentShift() {
    this.delivData.getCurrentShift().then(shift => {
      this.currentShift = shift;
    });
  }

  viewShift(shift) {
    this.navCtrl.push(ShiftPage, shift);
  }

  getShifts(refresher?) {
  	this.delivData.getShifts(this.filters)
  	.subscribe(data => {
      this.shifts = data;
  	}, err => {
      this.handleError(err);
    }, () => {
      if (refresher) {
        refresher.complete();
      }
    });
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

  selectShift(shift) {
    let alert = this.alertCtrl.create({
      title: 'Set active shift?',
      buttons: ['Cancel',
      {
        text: 'Confirm',
        handler: () => {
          this.currentShift = shift._id;
          this.delivData.setCurrentShift(shift)
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