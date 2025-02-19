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

  products : Product [] = [];
  errorMessage : string = '';

  loading : boolean = true;

  productId: string = '';
  sukValue: string = '';

  constructor (private _marketPlaceService : MarketplaceService,
    private _activatedRoute : ActivatedRoute,
    private _auroralService : AuroralService
  ) {}

  ngOnInit() {
    this.fetchData();
    this.fetchProducts();
  }

  fetchData () {

    this._activatedRoute.paramMap.subscribe(params => {
      this.productId = params.get('id') || '';
      this.sukValue = params.get('suk') || '';
    });
  }

  fetchProducts () {
    this._marketPlaceService.getWooProducts().subscribe({

      next: (data) => {
        this.products = data;
        this.loading = false;

        this.fetchRegisteresProducts(this.products);
      },

      error: (error) => {
        this.errorMessage = error;
        this.loading = false;
      }

    });
  }

  fetchRegisteresProducts (products : Product []) {
    this._auroralService.getProducts().subscribe(
      (data) => {
        const {message} = data;

        message.forEach((oid : string) => {

          this._auroralService.getProduct(oid).subscribe((data) => {

            if(data){
              const { adapterId } = data.message;
              const { properties } = data.message;
              
              const stock_quantity = 0;
              const price = 0;

              const product = products.filter((product : Product) => product.name === "Winter Vine Shoot" && product.stock_quantity
              === stock_quantity && product.price === price);


              if(product){
                
                console.log(product);
              }
            }
          });
        });

      },
      (error) => {
        console.error('Error al registrar el producto:', error); 
      }
    );
  }

  register(product : Product) {
    this._auroralService.registerProduct(product).subscribe(
      (data) => {
        this.fetchProducts();
      },
      (error) => {
        console.error('Error al registrar el producto:', error); 
      }
    );
  }
  
  updateProduct (product : Product) {
    console.log("updating product and reading ...");
  
    console.log(product);
  }

}
