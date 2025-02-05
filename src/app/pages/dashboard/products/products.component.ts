import { Component } from '@angular/core';
import { MarketplaceService } from '../../../services/marketplace/marketplace.service';
import { NgFor } from '@angular/common';
import { Product } from '../../../models/product';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [NgFor],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {

  products : Product [] = [];
  errorMessage : string = '';

  constructor (private _marketPlaceService : MarketplaceService) {}

  ngOnInit() {
    this.getProducts();
  }

  getProducts () {

    this._marketPlaceService.getWooProducts().subscribe({

      next: (data) => {
        console.log(data)
        this.products = data;
      },

      error: (error) => {
        this.errorMessage = error;
      }

    });
  }

}
