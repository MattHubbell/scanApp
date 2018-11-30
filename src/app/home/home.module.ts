import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HTTP } from '@ionic-native/http/ngx';
import { HomePage } from './home.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forChild([{ path: '', component: HomePage }])
  ],
  declarations: [HomePage],
  providers: [HTTP]
})
export class HomePageModule {}
