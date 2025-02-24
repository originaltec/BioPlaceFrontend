import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MarketplaceService } from '../../../services/marketplace/marketplace.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-vendor',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './vendor.component.html',
  styleUrl: './vendor.component.scss',
})
export class VendorComponent {

  storeId: number | null = null;
  store: any | null = null;
  storeKeys: string[] = [];

  loading : boolean = true;

  /**
   * Constructs an instance of VendorComponent.
   * 
   * @param _route - Injected instance of ActivatedRoute to handle route parameters.
   * @param _marketplaceService - Injected instance of MarketplaceService to interact with marketplace data.
   */
  constructor(
    private _route: ActivatedRoute,
    private _marketplaceService: MarketplaceService
  ) {}

  /**
   * Lifecycle hook that is called after data-bound properties of a directive are initialized.
   * Initializes the component by retrieving the store ID from the route parameters and fetching
   * the store details from the marketplace service if the store ID is present.
   * 
   * @returns {void}
   */
  ngOnInit(): void {
    this.storeId = Number(this._route.snapshot.paramMap.get('id'));

    if (this.storeId) {
      this._marketplaceService.getStoreById(this.storeId).subscribe(
        (response: any) => {
          this.store = response;
          this.storeKeys = Object.keys(response);

          this.loading = false;
        },
        (error) => {
          this.loading = false;
          console.error('Error al obtener la tienda:', error);
        }
      );
    }
  }

  /**
   * Converts a given value to a displayable string format.
   *
   * @param value - The value to be converted. It can be of any type.
   * @returns A string representation of the value. If the value is an array, 
   * it returns a comma-separated string of JSON stringified items. If the value 
   * is an object, it returns the JSON stringified representation of the object. 
   * If the value is null or undefined, it returns 'null'.
   */
  convertToDisplay(value: any): string {

    if (typeof value === 'object') {
      if (Array.isArray(value)) {
        return value.length
          ? value.map((item) => JSON.stringify(item)).join(', ')
          : '[]';
      }
      return JSON.stringify(value);
    }
    return value ?? 'null';
  }
}
