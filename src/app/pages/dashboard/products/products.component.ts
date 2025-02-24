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

  registeredElements : any;

  advice : boolean = false;
  adviceMarketplaceStock : number = 0;
  adviceProduct : any;

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
        this.registeredElements = data;
      }
    });
  }

  fetchProducts () {
    this._marketPlaceService.getWooProducts().subscribe({

      next: (data) => {
        this.products = data;
        this.loading = false;

        const arrayElement = this.registeredElements.message;

        arrayElement.forEach(( element : any, index : number) => {

          this._auroralService.getProduct(element).subscribe((tempElement) => {
            const { name } = tempElement.message;
          
            const index = this.products.findIndex((product: Product) => product.name === name);

            if (index !== -1) {
              console.log(this.products[index]);
              this.products[index].objectIdOid = element;
            }

          });
        });
      },

      error: (error) => {
        this.errorMessage = error;
        this.loading = false;
      }
    });
  }

  register(product : any, index : number = -1) {
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

  openAdvice(product: any) {
    this.advice = true;

    this._marketPlaceService.getWooProductById(product.id).subscribe(
      (response: any) => {
        this.adviceProduct = response;
        const tempStock = response[0].stock_quantity;
        this.adviceMarketplaceStock = tempStock;
      },
      (error) => {
        console.error('Error al obtener el producto:', error);
      }
    );
  }
  
  
  updateProduct(product: any, index = -1) {

    // const { objectIdOid } = product;

    this._auroralService.getItemData(
      "8b09e4ce-aead-433c-9dc2-be6180e3de73",
      "e17b2459-5e3c-456b-aaaa-d5f47d9817e7",
      "Shipments"
    ).subscribe(({ message: { quantity } }: any) => {
     
      console.log(quantity);

      // product.stock_quantity = quantity[0]?.value || 0;

      // const number = parseInt(product.stock_quantity.replace(/[,\.].*/, ""), 10);
      // let { description } = product;
      
      // description = description.replace(/<p[^>]*id=["']stock-info["'][^>]*>.*?<\/p>(?=[^<p>]*$)/s, '');
  
      // const extraText = `<p id='stock-info'><strong>Stock Del MarketPlace ${number}</strong></p>`;
      // const updatedDescription = description + extraText;
  
      // this._marketPlaceService.updateProduct(Number(product.id), number, updatedDescription).subscribe((data) => {

      //   if (index !== -1) {
      //     this.products[index].success = true;
      //   }
      // });

    });

  }
}
