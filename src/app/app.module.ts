import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { AuthenticatorProvider } from '../providers/authenticator/authenticator';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import firebase from '../firebase';
import { HomePage } from '../pages/home/home';
import { AddBookPage } from '../pages/add-book/add-book';
import { BooksOverviewPage } from '../pages/books-overview/books-overview';
import { RegisterPage } from '../pages/register/register';
import { Camera } from '@ionic-native/camera'
import { AngularFireStorage, AngularFireStorageModule } from 'angularfire2/storage';
import { RegisterPageModule } from '../pages/register/register.module';
import { BookDetailPage } from '../pages/book-detail/book-detail';
import { LocationProvider } from '../providers/location/location';
import { Geolocation } from '@ionic-native/geolocation';
import { HttpClientModule } from '@angular/common/http';
import { UserProfilePage } from '../pages/user-profile/user-profile'


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AddBookPage,
    BooksOverviewPage,
    BookDetailPage,
    UserProfilePage

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    RegisterPageModule,
    HttpClientModule

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AddBookPage,
    BooksOverviewPage,
    BookDetailPage,
    UserProfilePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AuthenticatorProvider,
    Camera,
    Geolocation,
    LocationProvider
  ]
})
export class AppModule { }
