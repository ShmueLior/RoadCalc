import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../environments/environment';


const httpOptions = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'Content-Type':  'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class GoogleDistanceService {

  url: string = 'https://maps.googleapis.com/maps/api/directions/json?';

  constructor(private http: HttpClient) { }

  getDistance(srcPlaceID: string, dstPlaceID: string) : Observable<any>{
    const reqUrl = this.url + 'origin=place_id:' + srcPlaceID + '&destination=place_id:' + dstPlaceID + '&alternatives=true' + '&key=' + 'AIzaSyAH2eOXc_rawTqPAb2R32WwPbtBQg659ds';
    return this.http.get<any>(reqUrl, httpOptions);
  }

}
