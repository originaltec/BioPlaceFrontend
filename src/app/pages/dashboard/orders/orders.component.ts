import { Component } from '@angular/core';
import { MarketplaceService } from '../../../services/marketplace/marketplace.service';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent {

      orders : any [] = [];
      errorMessage : string = '';
    
      constructor (private _marketPlaceService : MarketplaceService) {}
    
      ngOnInit() {
        this.getOrders();
      }
    
      getOrders () {
    
        this._marketPlaceService.getOrders().subscribe({
    
          next: (data) => {
            console.log(data);
            this.orders = data;
          },
    
          error: (error) => {
            this.errorMessage = error;
          }
    
        });
      }

}
