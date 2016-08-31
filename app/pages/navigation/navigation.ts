import {Component, ViewChild, ElementRef} from '@angular/core';
import {NavController, AlertController} from 'ionic-angular';
import { UserData } from '../../providers/user-data';
import { DeliveryData } from '../../providers/delivery-data';

declare var google;
 
@Component({
  templateUrl: 'build/pages/navigation/navigation.html'
})
export class NavigationPage {
 
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  activeShift: any;
  currentTask: any;
  labelIndex = 0;
  labels = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
 
  constructor (
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public delivData: DeliveryData,
    public user: UserData
  ) { }

  ngOnInit() {
    this.getActiveShift();
  }

  getActiveShift() {
    this.delivData.getShifts({start: new Date()})
    .subscribe(data => {
      this.activeShift = data[0];
      this.loadMap();
    }, err => {
      this.handleError(err);
    });
  }
 
  loadMap() {
    let latLng = new google.maps.LatLng(this.activeShift.waypoints[0].location.latitude, this.activeShift.waypoints[0].location.longitude);
    let mapOptions = {
      center: { lat: 53.5438, lng: -113.4956},
      zoom: 10,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    for (var i = 0; i < this.activeShift.waypoints.length; i++) {
      let waypoint = this.activeShift.waypoints[i];
      console.log(waypoint);
      this.addMarker({ lat: waypoint.location.latitude, lng: waypoint.location.longitude })
    }
  }

  addMarker(location) {
    var marker = new google.maps.Marker({
      position: location,
      label: this.labels[this.labelIndex++],
      map: this.map
    });
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