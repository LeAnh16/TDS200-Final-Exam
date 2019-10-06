import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Book } from '../../models/book';
import { Geolocation } from '@ionic-native/geolocation';
import { firestore } from 'firebase/app';
import { AngularFirestore } from 'angularfire2/firestore';
import { User } from '../../models/user';
/**
 * Generated class for the BookDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 //declaring google variable to to prevent any warnings from typeScript about the google object that google maps SDK makes available.
declare var google
@IonicPage()
@Component({
  selector: 'page-book-detail',
  templateUrl: 'book-detail.html',
})

export class BookDetailPage {

  user: User = {} as User;
  public book: Book;
  @ViewChild('map') mapElement: ElementRef;
  map: any;



  constructor(public firestore: AngularFirestore, public geolocation: Geolocation, public navCtrl: NavController, public navParams: NavParams) {
    this.book = this.navParams.get('book');
  }

  ionViewDidLoad(): void {
    this.loadMap()
    this.getUserbyID()
  }

  //creates a google maps that is centered on the location provided by our getcurrentposition method and sends the latitude and longititude inside the google maps method.
  loadMap(): void {
    this.geolocation.getCurrentPosition().then((position) => {

      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
      }
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      this.addMarker();
    }, (err) => {
      console.log(err);
    });
  }
//adds a marker on the center of the google maps location.
  addMarker(): void {
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter()
    });
  }

  getUserbyID(): void {
    this.firestore.collection('users').doc(this.book.uploader).ref.get()
      .then(user => {
        if (user.exists) {
          this.user = user.data() as User;
        } else {
          this.user = null;
        }
      })
  }
}