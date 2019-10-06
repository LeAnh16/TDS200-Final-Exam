import { HttpClient } from '@angular/common/http';
import { Injectable, Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from '@firebase/util';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from '../../models/user';
import * as firebase from 'firebase/app';





@Injectable()
export class AuthenticatorProvider {
  user: Observable<User>;

  constructor(
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth) {
    console.log('Hello AuthenticatorProvider Provider');
  }

  async loginUser(email, password): Promise<any> {
    return this.afs.app.auth()
      .signInWithEmailAndPassword(email, password);
  }

  async registerUser(email, password, user): Promise<void> {
    this.afs.app.auth()
      .createUserWithEmailAndPassword(email, password)
      .then(response => {
        console.log();
        user.uid = this.afs.app.auth().currentUser.uid;
        this.updateUserData(user)
      })
      .catch(error => {
        console.log(error);
      });
  }

  googleLogin(): Promise<any> {
    const provider = new firebase.auth.GoogleAuthProvider()
    return this.oauthLogin(provider);
  }

  private oauthLogin(provider): Promise<any> {
    if (!(<any>window).cordova) {
      return this.afAuth.auth.signInWithPopup(provider);
    } else {
      return this.afAuth.auth.signInWithRedirect(provider)
        .then(() => {
          return this.afAuth.auth.getRedirectResult().then(result => {
            // This gives you a Google Access Token.
            // You can use it to access the Google API.
            let token = result.credential.accessToken;
            // The signed-in user info.
            let user = result.user;
            console.log(token, user);
          }).catch(function (error) {
            // Handle Errors here.
            alert(error.message);
          });
        });
    }
  }

  private updateUserData(user): Promise<void> {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
    const data: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL
    }

    return userRef.set(data, { merge: true });
  }

  logout(): void {
    this.afAuth.auth.signOut();
  }

}
