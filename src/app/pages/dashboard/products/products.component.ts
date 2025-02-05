import { Component } from '@angular/core';
import { MarketplaceService } from '../../../services/marketplace/marketplace.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {

  products : any [] = [];
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
