import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AuthHttp } from 'angular2-jwt';
import { AuthService } from '../services/auth';
import 'rxjs/add/operator/map';

@Injectable()
export class DeliveryData {

  apiUrl = 'https://server-distrib.rhcloud.com/api/';   //f not h

  constructor (public http: Http, public authHttp: AuthHttp, public auth: AuthService) {}

  getShifts(filters?) {
    // let query = this.apiUrl+'shifts?driver='+this.user.getUserID();
    let query = this.apiUrl+'shifts?driver='+1245;
    if (filters) {
      if (filters.start) {
        query = query+'&start=' + filters.start;
      }
      if (filters.end) {
        query = query+'&end=' + filters.end;
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

}