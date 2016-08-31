import { Injectable } from '@angular/core';
import { Events, LocalStorage, Storage } from 'ionic-angular';
import { DeliveryData } from './delivery-data';

@Injectable()
export class UserData {
  HAS_LOGGED_IN = 'hasLoggedIn';
  USERID = "10004";
  CURRENTSHIFT: any;
  storage = new Storage(LocalStorage);

  constructor (public events: Events) {}

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
    return this.CURRENTSHIFT;
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