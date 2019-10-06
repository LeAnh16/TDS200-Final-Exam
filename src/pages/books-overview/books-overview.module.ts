import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BooksOverviewPage } from './books-overview';

@NgModule({
  declarations: [
    BooksOverviewPage,
  ],
  imports: [
    IonicPageModule.forChild(BooksOverviewPage),
  ],
})
export class BooksOverviewPageModule {}
