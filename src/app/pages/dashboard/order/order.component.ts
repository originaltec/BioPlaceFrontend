import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MarketplaceService } from '../../../services/marketplace/marketplace.service';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss'
})
export class OrderComponent {

      orderId: number | null = null;
      order: any | null = null;
      ordersKeys: string[] = []; 
    
      loading : boolean = true;

      /**
       * Constructs an instance of OrderComponent.
       * 
       * @param _route - The activated route instance to manage route parameters and data.
       * @param _marketplaceService - The marketplace service to handle marketplace-related operations.
       */
      constructor(
        private _route: ActivatedRoute,
        private _marketplaceService : MarketplaceService
      ) {}
    
      /**
       * Lifecycle hook that is called after data-bound properties of a directive are initialized.
       * Initializes the component by retrieving the order ID from the route parameters and fetching the order details from the marketplace service.
       * If the order ID is present, it makes an HTTP request to get the order details and assigns the response to the component's order property.
       * It also extracts the keys of the order object and sets the loading state to false once the data is fetched or if an error occurs.
       */
      ngOnInit(): void {
        this.orderId = Number(this._route.snapshot.paramMap.get('id'));
    
         if (this.orderId) {
          this._marketplaceService.getOrderById(this.orderId).subscribe(
            (response: any) => {
              this.order = response;
              this.ordersKeys = Object.keys(response);
              this.loading = false;
            },
            (error : any) => {
              this.loading = false;
            }
          );
        }
      }
    
      /**
       * Converts a given value to a displayable string.
       * 
       * @param value - The value to be converted. It can be of any type.
       * @returns A string representation of the value. If the value is an array, 
       * it returns a comma-separated string of JSON stringified items. If the value 
       * is an object, it returns the JSON stringified representation of the object. 
       * If the value is null or undefined, it returns 'null'.
       */
      convertToDisplay(value: any): string {
        if (typeof value === 'object') {
          if (Array.isArray(value)) {
            return value.length ? value.map(item => JSON.stringify(item)).join(', ') : '[]';
          }
          return JSON.stringify(value); 
        }
        return value ?? 'null'; 
      }
    

}
