import { Component } from '@angular/core';
import { CardIO } from '@ionic-native/card-io/ngx';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private cardIO: CardIO, private toastController: ToastController) {
  }

  cardImage = 'assets/image/credit-card.png';

  card = {
    cardType: '',
    cardNumber: '',
    redactedCardNumber: '',
    expiryMonth: null,
    expiryYear: null,
    cvv: '',
    postalCode: ''
  };

  fabGone = false;

  ionViewDidLoad() {
    console.log('Hello Home Page!');
  }

  scanCard() {
    this.cardIO.canScan()
      .then(
        (res: boolean) => {
          if (res) {
            const options = {
              scanExpiry: true,
              hideCardIOLogo: true,
              scanInstructions: 'Please position your card inside the frame',
              keepApplicationTheme: true,
              requireCCV: true,
              requireExpiry: true,
              requirePostalCode: false
            };
            this.cardIO.scan(options).then(response => {
              console.log('Scan complete');

              const { cardType, cardNumber, redactedCardNumber,
                      expiryMonth, expiryYear, cvv, postalCode } = response;

              this.card = {
                cardType,
                cardNumber,
                redactedCardNumber,
                expiryMonth,
                expiryYear,
                cvv,
                postalCode
              };
            });
          }
      })
      .catch(
        (res: any) => {
          this.presentToast(res);
        }
      );
  }

  // Just to animate the fab
  ionViewWillEnter() {
    this.fabGone = false;
  }

  ionViewWillLeave() {
    this.fabGone = true;
  }

  async presentToast(mes: string) {
    const toast = await this.toastController.create({
      message: mes,
      duration: 2000
    });
    toast.present();
  }

  async presentToastWithOptions(mes: string) {
    const toast = await this.toastController.create({
      message: mes,
      showCloseButton: true,
      position: 'top',
      closeButtonText: 'Done'
    });
    toast.present();
  }
}
