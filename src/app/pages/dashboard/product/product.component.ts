import { Component } from '@angular/core';
import { Product } from '../../../models/product';
import { ActivatedRoute, Router } from '@angular/router';
import { MarketplaceService } from '../../../services/marketplace/marketplace.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {

  productId: number | null = null;
  product: any | null = null;
  productKeys: string[] = []; 
  loading : boolean = true;

  /**
   * Constructs an instance of the ProductComponent.
   * 
   * @param _activatedRoute - Injected service to handle the current active route.
   * @param _marketplaceService - Injected service to interact with the marketplace.
   * @param _router - Injected service to handle navigation.
   */
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _marketplaceService : MarketplaceService,
    private _router : Router
  ) {}

  /**
   * Initializes the component by retrieving the product ID from the route parameters,
   * setting the loading state to true, and fetching the product details from the marketplace service.
   * If the product ID is valid, it makes an HTTP request to get the product details.
   * On successful response, it assigns the product details to the component's product property,
   * extracts the keys of the product object, and sets the loading state to false.
   * If an error occurs during the HTTP request, it sets the loading state to false
   * and navigates to the product list page.
   */
  ngOnInit(): void {
    this.productId = Number(this._activatedRoute.snapshot.paramMap.get('id'));
    this.loading = true;

    if (this.productId) {
      this._marketplaceService.getWooProductById(this.productId).subscribe(
        (response: any) => {
          this.product = response;

          this.productKeys = Object.keys(response[0]);

          this.loading = false;
        },
        (error) => {
          this.loading = false;
          this._router.navigate(['/dashboard/productos']);
        }
      );
    }
  }

  /**
   * Converts a given value to a displayable string format.
   * 
   * @param value - The value to be converted. It can be of any type.
   * @returns A string representation of the value. If the value is an array, 
   *          it returns a comma-separated string of JSON stringified items. 
   *          If the value is an object, it returns the JSON stringified object. 
   *          If the value is null or undefined, it returns 'null'.
   */
  convertToDisplay(value: any): string {
    if (typeof value === 'object') {
      if (Array.isArray(value)) {
        return value.length ? value.map(item => JSON.stringify(item)).join(', ') : '[]';
      }
      return JSON.stringify(value); 
    }
    return value ?? 'null'; 
  }

}
