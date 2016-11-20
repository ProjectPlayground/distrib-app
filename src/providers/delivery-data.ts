import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { AuthHttp } from 'angular2-jwt';
import { AuthService } from '../providers/auth';
import 'rxjs/add/operator/map';

@Injectable()
export class DeliveryData {

  apiUrl = 'https://server-distrib.rhcloud.com/api/';

  constructor (
  	public http: Http, 
  	public authHttp: AuthHttp, 
  	public auth: AuthService, 
  	public events: Events, 
  	public storage: Storage
 	) {}

  getShifts(filters?) {
    let query = this.apiUrl+'shifts?driver='+this.auth.user._id;
    if (filters) {
      if (filters.start) {
        query = query+'&start=' + filters.start;
      }
      if (filters.end) {
        query = query+'&end=' + filters.end;
      }
      if (filters.id) {
        query = this.apiUrl+'shifts/'+filters.id;
      }
    }
    return this.authHttp.get(query)
      .map(res => res.json());
  }

  postShift(shift) {
    return this.authHttp.post(this.apiUrl+'shifts', shift)
      .map(res => res.json());
  }

  deleteShift(shift) {
    return this.authHttp.delete(this.apiUrl+'shifts/'+shift._id)
  }

  orderStatus(order, status) {
    return this.authHttp.patch(this.apiUrl+'orders/'+order._id+'/status', {status: status})
      .map(res => res.json());
  }

  waypointStatus(shift, waypoint, status) {
    return this.authHttp.patch(this.apiUrl+'shifts/'+shift._id+'/waypoints/'+waypoint._id, {status: status})
      .map(res => res.json());
  }

  setCurrentShift(shift) {
    this.storage.set('currentShift', shift._id); // save id of current shift (cant save objects)
  }

  getCurrentShift() {
    return this.storage.get('currentShift').then(value => {
      return value;
    });
  }

}