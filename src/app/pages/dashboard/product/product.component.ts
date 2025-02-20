import { Component } from '@angular/core';
import { Product } from '../../../models/product';
import { ActivatedRoute, Router } from '@angular/router';
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
  loading : boolean = true;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _marketplaceService : MarketplaceService,
    private _router : Router
  ) {}

  ngOnInit(): void {
    this.productId = Number(this._activatedRoute.snapshot.paramMap.get('id'));
    this.loading = true;

    if (this.productId) {
      this._marketplaceService.getWooProductById(this.productId).subscribe(
        (response: any) => {
          this.product = response;

          this.productKeys = Object.keys(response[0]);

          this.loading = false;
        },
        (error) => {
          this.loading = false;
          this._router.navigate(['/dashboard/productos']);
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
