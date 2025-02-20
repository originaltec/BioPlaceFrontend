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

    constructor(
      private _route: ActivatedRoute,
      private _marketplaceService : MarketplaceService
    ) {}
  
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
