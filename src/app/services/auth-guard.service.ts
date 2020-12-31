import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import 'firebase/firestore';
import { FirebaseService } from './firebase.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(public authService: FirebaseService, public router: Router) {}

  canActivate() {
    return this.authService.isAuthenticated().then((val) => {
      if (val) {
        return true;
      } else {
        this.router.navigate(['login']);
        return false;
      }
    });
  }
}
