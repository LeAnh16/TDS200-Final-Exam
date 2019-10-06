import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading } from 'ionic-angular';
import { User } from '../../models/user';
import { HomePage } from '../home/home';
import { LoadingController } from 'ionic-angular';
import { AuthenticatorProvider } from '../../providers/authenticator/authenticator';
import { _catch } from 'rxjs/operator/catch';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  loader: Loading;
  email: string;
  password: string;
  
  constructor(public authenticator: AuthenticatorProvider, public loadingCtrl: LoadingController, public navCtrl: NavController, public navParams: NavParams) {
  }

  login(): void {
    this.presentLoading()
    this.authenticator.loginUser(this.email, this.password).then(success => {
      this.navCtrl.push(HomePage);
    })
    .catch(
      //alerts the user through a loader with a message.
      fail => {
        this.loader.setContent("wrong password or username")
        this.loader.setSpinner("hide")
        setTimeout(timer => this.loader.dismiss(), 2000)

      });
    }

  googleLogin(): void {
    this.authenticator.googleLogin();
  }

  register(): void {
    this.presentLoading();
    this.navCtrl.push('RegisterPage');
  }
  //creates a loading page while waiting for an event.
  presentLoading(): void {
    this.loader = this.loadingCtrl.create({
      content: "Please wait..",
      dismissOnPageChange: true
    });
    this.loader.present();
  }
}
