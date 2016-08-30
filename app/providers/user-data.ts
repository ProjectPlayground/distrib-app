import { Injectable } from '@angular/core';
import { DeliveryData } from './delivery-data';
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
    return this.CURRENTSHIFT;
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