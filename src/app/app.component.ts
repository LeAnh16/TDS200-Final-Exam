import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireAuth } from 'angularfire2/auth';
import { HomePage } from '../pages/home/home';
import { BooksOverviewPage } from '../pages/books-overview/books-overview';
@Component({
  templateUrl: 'app.html'
  
})
export class MyApp {
  rootPage: any;
  loader: any;

  constructor(angularfireauth: AngularFireAuth, platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      //a method to change the rootpage based on if the user is logged in or not.
      const auth = angularfireauth.auth.onAuthStateChanged((user) => {
        if (user) {  
           this.rootPage = 'TabPage';
        } else {
          this.rootPage = 'LoginPage';
        }
      });


      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
