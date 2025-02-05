import { Component } from '@angular/core';
import { MarketplaceService } from '../../../services/marketplace/marketplace.service';
import { NgFor, NgIf } from '@angular/common';
import { Product } from '../../../models/product';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {

  products : Product [] = [];
  errorMessage : string = '';

  loading : boolean = true;

  constructor (private _marketPlaceService : MarketplaceService) {}

  ngOnInit() {
    this.getProducts();
  }

  getProducts () {

    this._marketPlaceService.getWooProducts().subscribe({

      next: (data) => {
        this.products = data;
        this.loading = false;
      },

      error: (error) => {
        this.errorMessage = error;
        this.loading = false;
      }

    });
  }

}
