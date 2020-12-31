import { Component, OnInit, ViewChild } from '@angular/core';
import {} from 'googlemaps';

@Component({
  selector: 'app-ride-form',
  templateUrl: './ride-form.component.html',
  styleUrls: ['./ride-form.component.css']
})
export class RideFormComponent implements OnInit {
  @ViewChild('map') mapElement: any;
  map: google.maps.Map;
  address: Object;
  establishmentAddress: Object;
  constructor() { }

  ngOnInit(): void {
  }

  getAddress(place: google.maps.places.PlaceResult) {
    console.log('in maps',place);
   const marker = new google.maps.Marker({
     position: new google.maps.LatLng(place.geometry.location.lat(),place.geometry.location.lng()),
     title: place.name
   })
   marker.setMap(this.map)
   this.map.setCenter(new google.maps.LatLng(place.geometry.location.lat(),place.geometry.location.lng()))
 }

}
