import { Component, inject, OnInit } from '@angular/core';
import { PaypalService } from './services/paypal.service';
import { IPayPalConfig, NgxPayPalModule } from 'ngx-paypal';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [NgxPayPalModule]
})
export class AppComponent implements OnInit {
  payPalConfig?: IPayPalConfig;

  private payPalService = inject(PaypalService);

  ngOnInit(): void {
    this.initPayPal();
  }

  initPayPal(): void {
    this.payPalService.getPayPalConfig(15)
      .then((config: IPayPalConfig) => {
        this.payPalConfig = config;
      })
      .catch((error) => {
        console.error('Error initializing PayPal:', error);
      });
  }
}
