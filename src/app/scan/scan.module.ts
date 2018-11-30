import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { Camera } from '@ionic-native/camera/ngx';
import { CardIO } from '@ionic-native/card-io/ngx';
import { ScanPage } from './scan.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([{ path: '', component: ScanPage }])
  ],
  declarations: [ScanPage],
  providers: [
    Camera,
    CardIO
  ]
})
export class ScanPageModule {}
