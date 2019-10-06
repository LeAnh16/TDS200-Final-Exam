import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../models/user';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthenticatorProvider } from '../../providers/authenticator/authenticator';
import { Camera } from '@ionic-native/camera';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireStorage } from 'angularfire2/storage';


/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  user: User = {} as User;
  password: string;
  public previewImage: string = "";

  constructor(public afStorage: AngularFireStorage,
    public firestore: AngularFirestore,
    public camera: Camera, public authentication: AuthenticatorProvider,
    public navCtrl: NavController, public navParams: NavParams) {
      
    }
  
  async register(): Promise<void> {
    let imageFileName = `${new Date().getTime()}.png`;

    let task = this.afStorage
      .ref(imageFileName)
      .putString(this.previewImage, 'base64', { contentType: 'image/png' });

    let uploadEvent = task.downloadURL().toPromise();
    await uploadEvent.then((uploadImageUrl) => this.user.photoURL = uploadImageUrl);
    await this.authentication.registerUser(this.user.email, this.password, this.user)
  }
  
  executeCamera() {
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
}
