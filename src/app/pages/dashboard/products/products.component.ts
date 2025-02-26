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
  styleUrl: './products.component.scss',
})
export class ProductsComponent {

  products: any[] = [];
  errorMessage: string = '';

  loading: boolean = true;

  productId: string = '';
  sukValue: string = '';

  success: boolean = false;

  registeredElements: any;

  advice: boolean = false;
  adviceMarketplaceStock: number = 0;
  adviceProduct: any;
  adviceIndex : number = -1;
  adviceQuantity: number = 0;

  uploading: boolean = false;


  /**
   * Constructs an instance of the ProductsComponent.
   *
   * @param _marketPlaceService - Service to interact with the marketplace.
   * @param _activatedRoute - Service to access information about the current route.
   * @param _auroralService - Service to interact with the Auroral API.
   */
  constructor(
    private _marketPlaceService: MarketplaceService,
    private _activatedRoute: ActivatedRoute,
    private _auroralService: AuroralService
  ) {}

  ngOnInit() {
    this.fetchRegisteredProducts();
    this.fetchData();
    this.fetchProducts();
  }

  /**
   * Fetches data based on route parameters.
   * Subscribes to the route parameters and assigns the values to `productId` and `sukValue`.
   * If the parameters are not present, assigns an empty string.
   */
  fetchData() {
    this._activatedRoute.paramMap.subscribe((params) => {
      this.productId = params.get('id') || '';
      this.sukValue = params.get('suk') || '';
    });
  }

  /**
   * Fetches the registered products from the service and assigns them to the registeredElements property.
   *
   * This method makes a call to the _auroralService's getProducts method, which returns an observable.
   * When the observable emits data, it checks if the data is not null or undefined.
   * If data is present, it assigns the data to the registeredElements property.
   */
  fetchRegisteredProducts() {
    this._auroralService.getProducts().subscribe((data) => {
      if (data) {
        this.registeredElements = data;
      }
    });
  }

  /**
   * Fetches products from the marketplace service and updates the component's product list.
   *
   * This method performs the following steps:
   * 1. Calls the marketplace service to get WooCommerce products.
   * 2. Subscribes to the response and updates the `products` array and `loading` state.
   * 3. Iterates over the registered elements and fetches additional product details from the auroral service.
   * 4. Updates the corresponding product in the `products` array with the fetched details.
   *
   * In case of an error during the fetch operation, the `errorMessage` and `loading` state are updated accordingly.
   *
   * @returns {void}
   */
  fetchProducts() {
    this._marketPlaceService.getWooProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.loading = false;

        const arrayElement = this.registeredElements.message;

        arrayElement.forEach((element: any, index: number) => {
          this._auroralService.getProduct(element).subscribe((tempElement) => {
            const { name } = tempElement.message;

            const index = this.products.findIndex(
              (product: Product) => product.name === name
            );

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
      },
    });
  }

  /**
   * Registers a product using the Auroral service and updates the product list.
   * If an error occurs during registration and the error message starts with "REGISTRATION",
   * it sets the error flag on the product at the specified index.
   *
   * @param product - The product to be registered.
   * @param index - The index of the product in the products array. Defaults to -1.
   */
  register(product: any, index: number = -1) {
    this.products[index].loading = true;

    this._auroralService.registerProduct(product).subscribe(
      (data) => {
        this.products[index].successUpload = true;
        this.products[index].loading = false;
        this.fetchProducts();
      },
      (error) => {
        this.products[index].errorUpload = true;
        this.products[index].loading = false;

        if (error.error.message[0].error.startsWith('REGISTRATION')) {
          if (index !== -1) this.products[index].error = true;
        }
      }
    );
  }

  /**
   * Opens the advice modal for a given product and fetches its details from the marketplace service.
   *
   * @param product - The product object containing the product details.
   *
   * @remarks
   * This method sets the `advice` flag to true and makes an HTTP request to fetch the product details
   * by its ID. On successful response, it assigns the product details to `adviceProduct` and updates
   * the `adviceMarketplaceStock` with the product's stock quantity. If an error occurs during the
   * HTTP request, it logs the error to the console.
   *
   * @example
   * ```typescript
   * const product = { id: 123, name: 'Sample Product' };
   * this.openAdvice(product);
   * ```
   */
  openAdvice(product: any, index : number) {
    this.advice = true;
    this.adviceIndex = index;

    const { objectIdOid } = product;

    this._auroralService
      .getItemData(
        "cb3bb356-507b-4cdc-8865-e2a8c632d3d4",
        "e17b2459-5e3c-456b-aaaa-d5f47d9817e7",
        "Shipments"
      )
      .subscribe(
        ({ message: { quantity } }: any) => {
          const temp = quantity[0]?.value || 0;

          const number = parseInt(
            temp.replace(/[,\.].*/, ''),
            10
          );

          this.adviceQuantity = number;

          this._marketPlaceService.getWooProductById(product.id).subscribe(
            (response: any) => {
              this.adviceProduct = response;
              const tempStock = response[0].stock_quantity;
              this.adviceMarketplaceStock = tempStock || 0;

              console.log(this.adviceQuantity);
              console.log(this.adviceMarketplaceStock);
            },
            (error) => {
              console.error('Error al obtener el producto:', error);
            }
          );

        },
        (error) => {
          console.error('Error al obtener datos del artículo:', error);
        }
      );

  }

  updateProduct() {

    const product = this.products[this.adviceIndex];

    console.log(product);

    product.stock_quantity = this.adviceQuantity || 0;

          let { description } = product;

          description = description.replace(
            /<p[^>]*id=["']stock-info["'][^>]*>.*?<\/p>(?=[^<p>]*$)/s,
            ''
          );

          const extraText = `<p id='stock-info'><strong>Stock Del MarketPlace ${this.adviceQuantity}</strong></p>`;
          const updatedDescription = description + extraText;

          this._marketPlaceService
            .updateProduct(Number(product.id), this.adviceQuantity, updatedDescription)
            .subscribe({
              next: (data) => {
                this.advice = false;

                if (this.adviceIndex !== -1) {
                  this.products[this.adviceIndex].success = true;
                }
              },
              error: (err) => {
                console.error(
                  'Error al actualizar el producto en el marketplace:',
                  err
                );
                this.uploading = false;
                this.advice = false;
                if (this.adviceIndex !== -1) {
                  this.products[this.adviceIndex].success = false;
                }
              },
            });
    
  }
}
