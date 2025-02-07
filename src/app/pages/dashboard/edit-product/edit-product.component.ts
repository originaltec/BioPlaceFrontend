import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MarketplaceService } from '../../../services/marketplace/marketplace.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.scss'
})
export class EditProductComponent {

    productId: number | null = null;
    product: any | null = null;
  
    stock : string = '';

    constructor(
      private _route: ActivatedRoute,
      private _marketplaceService : MarketplaceService
    ) {}
  
    ngOnInit(): void {
      this.productId = Number(this._route.snapshot.paramMap.get('id'));
  
      console.log(this.productId)

      if (this.productId) {
        this._marketplaceService.getWooProductById(this.productId).subscribe(
          (response: any) => {
            this.product = response;
          },
          (error) => {
            console.error('Error al obtener el producto:', error);
          }
        );
      }
    }

}
