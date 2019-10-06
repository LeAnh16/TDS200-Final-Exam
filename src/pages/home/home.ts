import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import firebase from '../../firebase';

import { Book } from '../../models/book';
import { Observable } from 'rxjs/Observable'
import Rx from 'rxjs/Rx'
import { BooksOverviewPage } from '../books-overview/books-overview';
import { AddBookPage } from '../add-book/add-book';
import { RegisterPage } from '../register/register';

import { AngularFireAuth } from 'angularfire2/auth';
import { BookDetailPage } from '../book-detail/book-detail';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'

})

export class HomePage {
  
  public booksCache: Observable<Book[]>;
  public books: Observable<Book[]>;

  constructor(public navCtrl: NavController, public firestore: AngularFirestore) {
    this.fetchItems();
  }

  //sends the user to the detail page, as well as the parameters that is needed to display the detail page.
  pushDetailPage(book: Book): void {
    this.navCtrl.push(BookDetailPage, { book });
  }


  fetchItems(): void {
    this.booksCache = this.firestore.collection('books')
      .snapshotChanges()
      .map(actions => {
        return actions.map(action => {
          let data = action.payload.doc.data() as Book;
          let id = action.payload.doc.id;
          return { id, ...data }
        })
      });
  }
//shows all books by 
  showAllbooks(): void {
    this.books = this.booksCache;
  }
  
  //uses the user input in the searchbar to filter out the books for sale.
  getItems(searchbar): void {
    let input = searchbar.srcElement.value;
    if (!input) {
      return;
    }
    //sets a timer so all actions before the user stops typing is cancelled.
    Rx.Observable.fromEvent(document.getElementsByClassName("searchbar-input"), "keyup")
      .debounceTime(500)
      .subscribe((v) => {
        this.books = this.booksCache
          .map(value => value.filter(book => book.title.toLowerCase().includes(input.toLowerCase())));
      });
  }


}
