import { Component } from '@angular/core';
import { MarketplaceService } from '../../../services/marketplace/marketplace.service';
import { NgFor, NgIf } from '@angular/common';
import { Product } from '../../../models/product';
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [NgIf, NgFor, RouterModule, RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {

  products : Product [] = [];
  errorMessage : string = '';

  loading : boolean = true;

  productId: string = '';
  sukValue: string = '';

  constructor (private _marketPlaceService : MarketplaceService,
    private _activatedRoute : ActivatedRoute
  ) {}

  ngOnInit() {
    this.fetchData();
    this.getProducts();
  }

  fetchData () {

    this._activatedRoute.paramMap.subscribe(params => {
      this.productId = params.get('id') || '';
      this.sukValue = params.get('suk') || '';
    });
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

  register (product : Product){
    console.log(product);
  }

}
