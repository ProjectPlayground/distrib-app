import { Injectable } from '@angular/core';
import { Events, LocalStorage, Storage } from 'ionic-angular';

@Injectable()
export class UserData {
  HAS_LOGGED_IN = 'hasLoggedIn';
  USERID = "57c478c021527d402c6cc20f";
  CURRENTSHIFT: any;
  storage = new Storage(LocalStorage);

  constructor(public events: Events) {}

  login(username) {
    this.storage.set(this.HAS_LOGGED_IN, true);
    this.setUsername(username);
    this.events.publish('user:login');
  }

  signup(username) {
    this.storage.set(this.HAS_LOGGED_IN, true);
    this.setUsername(username);
    this.events.publish('user:signup');
  }

  logout() {
    this.storage.remove(this.HAS_LOGGED_IN);
    this.storage.remove('username');
    this.events.publish('user:logout');
  }

  setUsername(username) {
    this.storage.set('username', username);
  }

  getUserID() {
    return this.USERID;
  }

  hasLoggedIn() {
    return this.storage.get(this.HAS_LOGGED_IN).then((value) => {
      return value;
    });
  }

  setCurrentShift(shift) {
    this.CURRENTSHIFT = shift; 
  }

  getCurrentShift() {
    if (this.CURRENTSHIFT) {
      return this.CURRENTSHIFT;
    }
    // let filters = {
    //   start: new Date(new Date().setHours(0,0,0,0)),
    //   end: new Date(new Date().setHours(47,59,0,0))
    // };
    // this.delivData.getShifts(filters)
    // .subscribe(data => {
    //   this.CURRENTSHIFT = data[0];
    //   return this.CURRENTSHIFT;
    // }, err => {
    //   this.handleError(err);
    // });
  }

  handleError(err) {
    console.log('error fetching current shift');
  }

//   setCurrentShift(shift) {
//     this.storage.set('currentShift', JSON.stringify(shift)); 
//   }

//   getCurrentShift() {
//     return this.storage.get('currentShift').then(value => {
//       return JSON.parse(value); 
//     }); 
//   }

}