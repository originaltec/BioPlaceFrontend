import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MarketplaceService } from '../../../services/marketplace/marketplace.service';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent {

    categoryId: number | null = null;
    category: any | null = null;
    categoriesKeys: string[] = []; 
  
    loading : boolean = true;

    /**
     * Creates an instance of CategoryComponent.
     * 
     * @param _route - Injected instance of ActivatedRoute to handle route parameters.
     * @param _marketplaceService - Injected instance of MarketplaceService to interact with marketplace data.
     */
    constructor(
      private _route: ActivatedRoute,
      private _marketplaceService : MarketplaceService
    ) {}
  
    /**
     * Initializes the component by retrieving the category ID from the route parameters
     * and fetching the corresponding category data from the marketplace service.
     * 
     * @returns {void}
     * 
     * @memberof CategoryComponent
     */
    ngOnInit(): void {
      this.categoryId = Number(this._route.snapshot.paramMap.get('id'));
  
      this.loading = true;

       if (this.categoryId) {
        this._marketplaceService.getCategory(this.categoryId).subscribe(
          (response: any) => {
            this.category = response;
            this.categoriesKeys = Object.keys(response);
            this.loading = false;
          },
          (error : any) => {
            this.loading = false;
            console.error('Error al obtener el producto:', error);
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
