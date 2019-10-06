import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AddBookPage } from '../add-book/add-book';
import { AngularFirestore } from 'angularfire2/firestore';
import { FirebaseFirestore } from '@firebase/firestore-types';


@IonicPage()
@Component({
  selector: 'page-books-overview',
  templateUrl: 'books-overview.html',
})
export class BooksOverviewPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public firestore: AngularFirestore) {
  }
  navigateToAddShoppingPage() {
    this.navCtrl.push(AddBookPage);
  }
}
