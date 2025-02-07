import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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

    productForm !: FormGroup;  

    productId: number | null = null;
    product: any | null = null;

    constructor(
      private _route: ActivatedRoute,
      private _marketplaceService : MarketplaceService,
      private _formBuilder : FormBuilder
    ) {}

    ngOnInit(): void {
      this.productForm = this._formBuilder.group({
        inStock: new FormControl('', Validators.required) 
      });

      this.productId = Number(this._route.snapshot.paramMap.get('id'));

      if (this.productId) {
        this._marketplaceService.getWooProductById(this.productId).subscribe(
          (response: any) => {
            this.product = response;
            
            this.productForm.setValue({
              inStock: this.product[0].inStock 
            });
          },
          (error) => {
            console.error('Error al obtener el producto:', error);
          }
        );
      }
    }

    update() {
      if (this.productForm.valid) {
        const {inStock} = this.productForm.value;
        // console.log(this.productForm.value);
        console.log(inStock)
      }
    }
}
