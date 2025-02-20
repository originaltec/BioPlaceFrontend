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


        this.products.forEach((product) => {
          console.log(product.description);
        }); 

        this.fetchRegisteredProducts(this.products);
      },

      error: (error) => {
        this.errorMessage = error;
        this.loading = false;
      }

    });
  }

  fetchRegisteredProducts (products : Product []) {
    // this._auroralService.getProducts().subscribe(
    //   (data) => {
    //     const {message} = data;

    //     message.forEach((oid : string) => {

    //       this._auroralService.getProduct(oid).subscribe((data) => {

    //         if(data){
    //           const { adapterId } = data.message;
    //           const { properties } = data.message;
              
    //           const stock_quantity = properties[0];
    //           const price = properties[1];

    //           const product = products.filter((product : Product) => product.name === adapterId && product.stock_quantity
    //           === stock_quantity && product.price === price);


    //           if(product){
    //           }
    //         }
    //       });
    //     });

    //   },
    //   (error) => {
    //     console.error('Error al registrar el producto:', error); 
    //   }
    // );
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
  
  updateProduct(product: any) {
    this._auroralService.getItemData(
      "cb3bb356-507b-4cdc-8865-e2a8c632d3d4",
      "e17b2459-5e3c-456b-aaaa-d5f47d9817e7",
      "Shipments"
    ).subscribe(({ message: { quantity } }: any) => {
      product.stock_quantity = quantity[0]?.value || 0;
      console.log("Product Id ", product.id, "Stock_Quantity", product.stock_quantity);
    
      const number = parseInt(product.stock_quantity.replace(/[,\.].*/, ""), 10);

      this._marketPlaceService.updateProduct(Number(product.id), number).subscribe((data) => {

        if(data){
          alert(`Stock del producto actualizado a ${number}: `);
        }
      });
    });
  }
  

}
