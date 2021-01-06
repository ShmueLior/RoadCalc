import { Injectable } from '@angular/core';
import 'firebase/firestore';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserProfile } from '../models/user';
import firebase from 'firebase/app'
import { AngularFireAuth } from '@angular/fire/auth';
import { Ride } from '../models/ride';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  db = firebase.firestore();
  constructor(private afs: AngularFirestore, private afAuth: AngularFireAuth) {}

  isAuthenticated() {
    var promise = new Promise((resolve, reject) => {
      this.afAuth.authState.subscribe((res) => {
        if (res && res.uid) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
    return promise;
  }

  createUser(user) {
    const userData: UserProfile = {
      id: user.id || '',
      phoneNumber: user.phoneNumber || '',
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      address: user.address || '',
      birthDate: user.birthDate || new Date(),
      photoURL: user.photoURL || '',
      email: user.email || '',
      uid: user.uid || '',
    };
    console.log('user is: ', userData);

    return this.db.collection(`users`).add(userData);
  }

  updateUser(userData) {
    this.afAuth.authState.subscribe((user) => {
      this.db
        .collection('users')
        .where('uid', '==', user.uid)
        .get()
        .then((querySnapshot) =>
          querySnapshot.forEach((doc) => {
            const docRef = this.db.collection(`users`).doc(`${doc.id}`);
            docRef.set(userData, { merge: true });
          })
        )
        .catch((err) =>
          console.log(`error while trying to update user: ${user.uid}`, err)
        );
    });
  }

  addRide(ride: Ride){
    this.afAuth.authState.subscribe( user => {
      if(user){
       this.db.collection('users')
       .where('uid', '==', user.uid)
       .limit(1)
       .get()
       .then((querySnapshot) => {
        if (querySnapshot.docs[0]) {
          const docRef = this.db
            .collection(`users`)
            .doc(`${querySnapshot.docs[0].id}`);
            docRef.collection('rides').add(ride)
            .then( data => {
              return data;
            })
            .catch (err => {
              return err;
            });
        }
       });
      }
    });
  }
}
