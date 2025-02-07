import { Component } from '@angular/core';
import { Product } from '../../../models/product';
import { ActivatedRoute } from '@angular/router';
import { MarketplaceService } from '../../../services/marketplace/marketplace.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {

  productId: number | null = null;
  product: any | null = null;
  productKeys: string[] = []; 

  constructor(
    private _route: ActivatedRoute,
    private _marketplaceService : MarketplaceService
  ) {}

  ngOnInit(): void {
    this.productId = Number(this._route.snapshot.paramMap.get('id'));

    if (this.productId) {
      this._marketplaceService.getWooProductById(this.productId).subscribe(
        (response: any) => {
          this.product = response;

          this.productKeys = Object.keys(response[0]);

          console.log(this.productKeys);
        },
        (error) => {
          console.error('Error al obtener el producto:', error);
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
