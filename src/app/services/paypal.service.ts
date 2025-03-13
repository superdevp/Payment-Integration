import { Injectable } from '@angular/core';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';

@Injectable({
  providedIn: 'root'
})
export class PaypalService {

  constructor( ) { }

  getPayPalConfig(amount: number): Promise<IPayPalConfig> {
    return new Promise<IPayPalConfig>((resolve, reject) => {
      try {
        const payPalConfig: IPayPalConfig = {
          currency: 'USD',
          clientId: 'AVPtu6vj3oObdMOO_Be2c0ZhlhyELlu6Yfwb-6ECXuIXcEeTuHfrUK2G6s2MOypqgT-yBEJ2bZGAs0Cx',
          createOrderOnClient: (data: any): ICreateOrderRequest => ({
            intent: 'CAPTURE',
            purchase_units: [
              {
                amount: {
                  currency_code: 'USD',
                  value: `${amount}`,
                },
                items: []
              },
            ],
          }),
          advanced: {
            commit: 'true'
          },
          style: {
            label: 'paypal',
            layout: 'horizontal',
            tagline: false,
          },
          onApprove: (data, actions) => {
            actions.order.capture().then((details: { payer: { name: { given_name: any; }; }; }) => {
              console.log('Captured order:', details);
              resolve(payPalConfig);
            }).catch((error: any) => {
              console.error('Error capturing order:', error);
              reject(error);
            });
          },
          onError: (err) => {
            console.error('PayPal Error:', err);
            reject(err);
          },
        };
  
        resolve(payPalConfig);
      } catch (error) {
        console.error('Error in PayPal configuration:', error);
        reject(error);
      }
    });
  }
}
