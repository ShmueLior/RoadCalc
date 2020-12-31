import { Component, OnInit, ViewChild,AfterViewInit, NgZone } from '@angular/core';
import {} from 'googlemaps';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent  implements OnInit {

  constructor(private router: Router){ }

  ngOnInit():void{}

  goToNewRide(){
    this.router.navigateByUrl('/ride');
  }


}
