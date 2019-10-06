import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Book } from '../../models/book';
import { AngularFirestore } from 'angularfire2/firestore';
import { Camera } from '@ionic-native/camera';
import { AngularFireStorage } from 'angularfire2/storage'
import { Geolocation } from '@ionic-native/geolocation'
import { LocationProvider } from '../../providers/location/location';

@IonicPage()
@Component({
  selector: 'page-add-book',
  templateUrl: 'add-book.html',
})
export class AddBookPage {
  book = { location: {} } as Book;
  public previewImage: string = "";

  constructor(private geolocation: Geolocation,
    private locationProvider: LocationProvider,
    private afStorage: AngularFireStorage,
    private camera: Camera,
    public firestore: AngularFirestore,
    public navCtrl: NavController,
    public navParams: NavParams, ) {

  }

  // a single method used to add a new book to firestore, including a picture with an unique name and the users current location.
  async addBook(): Promise<void> {
    //sets picture name to the current user's email, + a date at the end and names it as a png file.
    let imageFileName = `${this.firestore.firestore.app.auth()
      .currentUser.email}_${new Date().getTime()}.png`;

    let task = this.afStorage
      .ref(imageFileName)
      .putString(this.previewImage, 'base64', { contentType: 'image/png' });

    let uploadEvent = task.downloadURL().toPromise();

    await uploadEvent.then((uploadImageUrl) => this.book.image = uploadImageUrl);
    await this.findGeolocation();

    this.book.uploader = this.firestore.app.auth().currentUser.uid
    this.firestore.collection('books').add(this.book);

  }

  // activates the camera and allows the user to take a picture and stores it inside previewImage.
  executeCamera(): void {
    this.camera.getPicture({
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      cameraDirection: this.camera.Direction.BACK,
      correctOrientation: true
    })
      .then(imgBase64 => {
        this.previewImage = imgBase64;
      });
  }
  
  // finds the users geolocation and adds it into the book.location.lat and book.location.long for later use.
  findGeolocation(): Promise<any> {
    return this.geolocation.getCurrentPosition()
      .then(position => {
        this.book.location.lat = position.coords.latitude;
        this.book.location.long = position.coords.longitude;
      })
  }







}
