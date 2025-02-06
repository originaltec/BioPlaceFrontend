import { Component } from '@angular/core';
import { MarketplaceService } from '../../../services/marketplace/marketplace.service';
import { Order } from '../../../models/order';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent {

      orders : Order [] = [];
      errorMessage : string = '';
    
      constructor (private _marketPlaceService : MarketplaceService) {}
    
      ngOnInit() {
        this.getOrders();
      }
    
      getOrders () {
    
        this._marketPlaceService.getOrders().subscribe({
    
          next: (data : Order []) => {
            this.orders = data;

            console.log(this.orders);
          },
    
          error: (error) => {
            this.errorMessage = error;
          }
    
        });
      }

}
