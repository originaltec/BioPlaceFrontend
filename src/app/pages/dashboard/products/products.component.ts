import { Component } from '@angular/core';
import { MarketplaceService } from '../../../services/marketplace/marketplace.service';
import { NgFor, NgIf } from '@angular/common';
import { Product } from '../../../models/product';
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';
import { AuroralService } from '../../../services/auroral/auroral.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [NgIf, NgFor, RouterModule, RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {

  products : any [] = [];
  errorMessage : string = '';

  loading : boolean = true;

  productId: string = '';
  sukValue: string = '';

  success : boolean = false;

  constructor (private _marketPlaceService : MarketplaceService,
    private _activatedRoute : ActivatedRoute,
    private _auroralService : AuroralService
  ) {}

  ngOnInit() {
    this.fetchRegisteredProducts();
    this.fetchData();
    this.fetchProducts();
  }

  fetchData () {
    this._activatedRoute.paramMap.subscribe(params => {
      this.productId = params.get('id') || '';
      this.sukValue = params.get('suk') || '';
    });
  }

  fetchRegisteredProducts () {
    this._auroralService.getProducts().subscribe((data) => {

      if(data){
        console.log(data);
      }

    });
  }

  fetchProducts () {
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

  register(product : Product, index : number = -1) {
    this._auroralService.registerProduct(product).subscribe(
      (data) => {
        this.fetchProducts();
      },
      (error) => {
        
        if(error.error.message[0].error.startsWith("REGISTRATION")){

          if(index !== -1) 
            this.products[index].error = true;
        }
      }
    );
  }
  
  updateProduct(product: any, index: number = -1) {

    this._auroralService.getItemData(
      "cb3bb356-507b-4cdc-8865-e2a8c632d3d4",
      "e17b2459-5e3c-456b-aaaa-d5f47d9817e7",
      "Shipments"
    ).subscribe(({ message: { quantity } }: any) => {
      product.stock_quantity = quantity[0]?.value || 0;
  
      const number = parseInt(product.stock_quantity.replace(/[,\.].*/, ""), 10);
      let { description } = product;
  
      description = description.replace(/<p[^>]*id=["']stock-info["'][^>]*>.*?<\/p>(?=[^<p>]*$)/s, '');
  
      const extraText = `<p id='stock-info'><strong>Stock Del Auroral ${number}</strong></p>`;
      const updatedDescription = description + extraText;
  
      this._marketPlaceService.updateProduct(Number(product.id), number, updatedDescription).subscribe((data) => {
        if (index !== -1) {
          this.products[index].success = true;
        }
      });
    });

  }
  
  

}
