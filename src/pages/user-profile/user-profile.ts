import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../models/user';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';


@IonicPage()
@Component({
  selector: 'page-user-profile',
  templateUrl: 'user-profile.html',
})
export class UserProfilePage {
  user: User = {} as User;
  constructor(public afauth: AngularFireAuth, public firestore: AngularFirestore, public navCtrl: NavController, public navParams: NavParams) {
    this.getUserbyID();
  }

  getUserbyID(): void {
    this.firestore.collection('users').doc(this.firestore.app.auth()
      .currentUser.uid).ref.get()
      .then(user => {
        if (user.exists) {
          this.user = user.data() as User;
          console.log(user.data());
        } else {
          this.user = null;
        }
      })
      .catch(error =>
        console.log(error))
  }
  logout(): void {
    this.afauth.auth.signOut();
  }



}
