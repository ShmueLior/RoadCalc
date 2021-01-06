import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import {} from 'googlemaps';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { Ride } from '../../models/ride';
import { GoogleDistanceService } from '../../services/google-distance.service';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-ride-form',
  templateUrl: './ride-form.component.html',
  styleUrls: ['./ride-form.component.css']
})
export class RideFormComponent implements OnInit {
  @Output() setAddress: EventEmitter<any> = new EventEmitter();
  @ViewChild('addressInput') private addressInput: ElementRef;
  @ViewChild("placesRef") placesRef : GooglePlaceDirective;

  @ViewChild('map') mapElement: any;
  @ViewChild('rideForm') rideForm: NgForm;
  map: google.maps.Map;
  address: Object;
  establishmentAddress: Object;

  srcData: any;
  dstData: any;
  distance: number;

  options = {
    types: [],
    componentRestrictions: { country: 'IL' }
    }


  constructor(private router: Router, private distanceService: GoogleDistanceService, private fbService: FirebaseService,) {}

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

 submit(): void{
  const rideData : Ride = {
    startLocation: this.srcData.formatted_address || '',
    endLocation: this.dstData.formatted_address || '',
    distance: this.rideForm.value.distance || '',
    date: this.rideForm.value.date || '',
    note: this.rideForm.value.subject || '',
  };

  this.fbService.addRide(rideData);

  alert('Ride saved!');

  this.router.navigateByUrl('/ride');

 }

 public srcAddressChange(address: any) {
  const {formatted_address, place_id} = address;
  this.srcData = {
    formatted_address, place_id
  };
}

public dstAddressChange(address: any) {
  const {formatted_address, place_id} = address;
  this.dstData = {
    formatted_address, place_id
  };
}


public resetInput(): void {
  const input = this.addressInput.nativeElement as HTMLInputElement;
  input.value = '';
}

invokeEvent(place: Object) {
  this.setAddress.emit(place);
}


calculateDistance(){
  this.distanceService.getDistance(this.srcData.place_id, this.dstData.place_id).subscribe(res => {
    if(res.status === "OK"){
      this.distance = parseFloat(res.routes[res.routes.length - 1].legs[0].distance.text.split(" ")[0]);
    }
});
}

}
