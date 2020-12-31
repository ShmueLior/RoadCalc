import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn$: Observable<boolean>;
  isLoggedOut$: Observable<boolean>;
  pictureUrl$: Observable<string>;

  constructor(private router: Router, private afAuth: AngularFireAuth) {}

  ngOnInit(): void {
    // this.afAuth.authState.subscribe(user => console.log(user))
    this.isLoggedIn$ = this.afAuth.authState.pipe(map((user) => !!user));
    this.isLoggedOut$ = this.afAuth.authState.pipe(
      map((loggedIn) => !loggedIn)
    );
    this.pictureUrl$ = this.afAuth.authState.pipe(
      map((user) => (user ? user.photoURL : null))
    );
  }

  logout(): void {
    // localStorage.removeItem('login');
    // this.router.navigateByUrl('/login');
    this.afAuth.signOut().then((res) => this.router.navigateByUrl('/login'));
  }
}
