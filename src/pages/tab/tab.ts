import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BooksOverviewPage } from '../books-overview/books-overview';
import { HomePage } from '../home/home';
import { UserProfilePage } from '../user-profile/user-profile';

@IonicPage()
@Component({
  selector: 'page-tab',
  templateUrl: 'tab.html',
})
export class TabPage {
  public tabHomePage: any;
  public tabOverviewPage: any;
  public tabUserPage: any;
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  this.tabHomePage = HomePage;
    this.tabOverviewPage = BooksOverviewPage;
    this.tabUserPage = UserProfilePage;
  }

}
