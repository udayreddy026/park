import { Component, OnInit , OnDestroy } from '@angular/core';
import { GeoService } from '../shared/geo.service';
import * as firebase from 'firebase/app';
import 'firebase/database';

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.less']
})
export class GoogleMapComponent implements OnInit {

  lat : number;
  lng : number;
  markers : any;
  subscription : any;

  constructor( private geo : GeoService) { }

  ngOnInit() {
    this.getUserLocation();
    this.subscription = this.geo.hits.subscribe(hits => this.markers = hits);
    // console.log(this.markers);
    this.seedDatabase(); 
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

  private getUserLocation(){
    //Locate the user
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(position => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;

        this.geo.getLocations(5000 , [this.lat , this.lng])
      });
    }
  }

  private seedDatabase(){
    let dummypoints = [
      [29.548611, 78.935278],
    [26.666667, 93.35],
    [21.135556, 70.796667],
    [23.699444, 80.961944],
    [22.333333, 80.633333],
    [26.01733 , 76.50257],
    [12.06 , 76.151111],
    [11.661667 , 76.627222]
    ]

    dummypoints.forEach((val , idx) => {
      let name = `dummy-location-${idx}`
      // console.log(idx);
      this.geo.setLocation(name , val)
    })
  }

  onChoseLocation(event){
    // console.log(event);
    // this.lat = event.coords.lat;
    // this.lng = event.coords.lng;
  }
}