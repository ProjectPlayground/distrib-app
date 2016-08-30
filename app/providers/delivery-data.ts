import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { UserData } from './user-data';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class DeliveryData {

  apiUrl = 'https://162bb9bb.ngrok.io/api/';

  constructor(public http: Http, public user: UserData) {}

  getShifts(filters?) {
    let query = this.apiUrl+'shifts?driver='+this.user.getUserID();
    if (filters) {
      if (filters.start) {
        query = query+'&start=' + filters.start;
      }
      if (filters.end) {
        query = query+'&end=' + filters.end;
      }
    }
    return this.http.get(query)
      .map(res => res.json());
  }

  postShift(shift) {
    return this.http.post(this.apiUrl+'shifts', shift)
      .map(res => res.json());
  }

  deleteShift(shift) {
    return this.http.delete(this.apiUrl+'shifts/'+shift._id)
  }

}