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

      constructor(
        private _route: ActivatedRoute,
        private _marketplaceService : MarketplaceService
      ) {}
    
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
