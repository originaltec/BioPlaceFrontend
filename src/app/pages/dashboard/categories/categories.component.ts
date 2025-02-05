import { Component } from '@angular/core';
import { Category } from '../../../models/product';
import { MarketplaceService } from '../../../services/marketplace/marketplace.service';
import { RouterModule } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {

    categories : Category [] = [];
    errorMessage : string = '';
    loading : boolean = true;
  
    constructor (private _marketPlaceService : MarketplaceService) {}
  
    ngOnInit() {
      this.getCategories();
    }
  
    getCategories () {
  
      this._marketPlaceService.getCategories().subscribe({
  
        next: (data) => {
          this.categories = data;

          setTimeout(() => {
            this.loading = false;
          }, 500);
        },
  
        error: (error) => {
          this.errorMessage = error;

          setTimeout(() => {
            this.loading = false;
          }, 500);
        }
  
      });
    }

}
