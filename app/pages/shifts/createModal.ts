import { Component } from '@angular/core';
import { NavParams, ViewController, AlertController } from 'ionic-angular';
import { Geolocation } from 'ionic-native';
import { DeliveryData } from '../../providers/delivery-data';
import { AuthService } from '../../services/auth';
import * as moment from 'moment';

@Component({
  templateUrl: 'build/pages/shifts/createModal.html'
})
export class createModal {
  creating = false;
  today = moment().format('YYYY-MM-DDTHH:mmZ');
  form = {
    selectedDate: this.today,
    selectedStartTime: '09:00',
    selectedEndTime: '21:00',
    location: {
      latitude: undefined,
      longitude: undefined
    },
    address: {
      address1: undefined,
      city: 'Edmonton'
    }
  };

  constructor(
    public delivData: DeliveryData,
    public alert: AlertController, 
    public viewCtrl: ViewController,
    public auth: AuthService
  ) { }

  getLocation() {
    Geolocation.getCurrentPosition().then((resp) => {
      this.form.location.latitude = resp.coords.latitude;
      this.form.location.longitude = resp.coords.longitude;
    })
  }

  createShift() {
    let start = this.form.selectedStartTime.split(':').map(Number);
    let end = this.form.selectedEndTime.split(':').map(Number);
    let shift = {
      driver: this.auth.user._id,
      startTime: new Date(new Date(this.form.selectedDate).setHours(start[0], start[1])),
      endTime: new Date(new Date(this.form.selectedDate).setHours(end[0], end[1])),
      location: this.form.location,
      address: this.form.address
    }
    if (shift.startTime && shift.endTime && ((shift.location.latitude && shift.location.longitude) || shift.address.address1)){
      this.creating = true;
      this.delivData.postShift(shift)
      .subscribe(data => {
        this.creating = false;
        this.viewCtrl.dismiss(data);
      }, err => {
        this.creating = false;
        this.createError(err);
      });
    } else { 
      this.createError();
    }
  }

  createError(err?) {
    let alert = this.alert.create({
      title: 'Error creating shift',
      subTitle: err || 'Please fill in all required fields',
      buttons: ['OK']
    });
    alert.present();
  }

}