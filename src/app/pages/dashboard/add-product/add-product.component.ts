import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MarketplaceService } from '../../../services/marketplace/marketplace.service';
import { Product } from '../../../models/product';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss'
})
export class AddProductComponent {

  products : Product [] = [];
  loading : boolean = true;

  formControl !: FormControl;

  constructor (private _marketPlaceService : MarketplaceService) {}

  ngOnInit () {
    this.getProducts();     
  }

  getProducts () {
    this._marketPlaceService.getWooProducts().subscribe({

      next: (data) => {
        console.log(data);

        this.products = data;
        this.loading = false;
      },

      error: (error) => {
        this.loading = false;
      }

    });
  }

}
