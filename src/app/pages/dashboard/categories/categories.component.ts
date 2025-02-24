import { Component } from '@angular/core';
import { Category } from '../../../models/product';
import { MarketplaceService } from '../../../services/marketplace/marketplace.service';
import { RouterModule } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [NgFor, NgIf, RouterModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {

    categories : Category [] = [];
    errorMessage : string = '';
    loading : boolean = true;
  
    /**
     * Creates an instance of CategoriesComponent.
     * 
     * @param _marketPlaceService - An instance of MarketplaceService used to interact with the marketplace API.
     */
    constructor (private _marketPlaceService : MarketplaceService) {}
  
    /**
     * Lifecycle hook that is called after Angular has initialized all data-bound properties of a directive.
     * This is where you should perform component initialization.
     * In this case, it calls the `getCategories` method to fetch and initialize the categories data.
     */
    ngOnInit() {
      this.getCategories();
    }
  
    /**
     * Fetches the list of categories from the market place service.
     * 
     * This method subscribes to the `getCategories` observable from the `_marketPlaceService`.
     * On a successful response, it assigns the received data to the `categories` property and sets `loading` to false.
     * On an error response, it assigns the error to the `errorMessage` property and sets `loading` to false.
     */
    getCategories () {
  
      this._marketPlaceService.getCategories().subscribe({
  
        next: (data) => {
          this.categories = data;
          this.loading = false;
        },
  
        error: (error) => {
          this.errorMessage = error;
          this.loading = false;
        }
      });
    }

}
