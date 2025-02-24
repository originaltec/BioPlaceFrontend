import { Component } from '@angular/core';
import { MarketplaceService } from '../../../services/marketplace/marketplace.service';
import { Order } from '../../../models/order';
import { NgFor, NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [RouterModule, NgFor, NgIf],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent {

      orders : Order [] = [];
      errorMessage : string = '';
      loading : boolean = true;

      constructor (private _marketPlaceService : MarketplaceService) {}
    
      /**
       * Lifecycle hook that is called after Angular has initialized all data-bound properties of a directive.
       * This is where you should perform component initialization.
       * In this case, it calls the `getOrders` method to fetch the orders when the component is initialized.
       */
      ngOnInit() {
        this.getOrders();
      }
    
      /**
       * Fetches the list of orders from the market place service.
       * 
       * This method subscribes to the `getOrders` observable from the `_marketPlaceService`
       * and handles the response by updating the `orders` property with the fetched data.
       * It also manages the `loading` state and handles any errors that occur during the fetch operation.
       * 
       * @returns {void}
       */
      getOrders () {
    
        this._marketPlaceService.getOrders().subscribe({
    
          next: (data : Order []) => {
            this.orders = data;
            this.loading = false;
          },
    
          error: (error) => {
            this.errorMessage = error;
            this.loading = false;
          }
    
        });
      }

}
