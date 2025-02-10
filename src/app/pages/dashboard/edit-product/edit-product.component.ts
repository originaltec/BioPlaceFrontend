import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MarketplaceService } from '../../../services/marketplace/marketplace.service';
import { NgIf } from '@angular/common';
import { Product } from '../../../models/product';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule],
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent {

    productForm !: FormGroup;  

    productId: number | null = null;
    product: any | null = null;

    constructor(
      private _route: ActivatedRoute,
      private _marketplaceService : MarketplaceService,
      private _formBuilder : FormBuilder,
      private _router : Router
    ) {}

    ngOnInit(): void {
      this.productForm = this._formBuilder.group({
        stock_quantity: new FormControl('', [Validators.required, Validators.min(0)])
      });

      this.productId = Number(this._route.snapshot.paramMap.get('id'));

      if (this.productId) {
        this._marketplaceService.getWooProductById(this.productId).subscribe(
          (response: any) => {
            this.product = response;

            console.log(response)

            this.productForm.setValue({
              stock_quantity: this.product[0].stock_quantity || 0
            });
          },
          (error) => {
            console.error('Error al obtener el producto:', error);
          }
        );
      }
    }

    update(): void {
      if (this.productForm.valid && this.product) {
    
        const { stock_quantity } = this.productForm.value;
    
        // const tempProduct = { stock_quantity: stockQuantity };
    
        this._marketplaceService.updateProduct(Number(this.productId), stock_quantity).subscribe(
          (response) => {
            console.log('Producto actualizado con éxito', response);
          },
          (error) => {
            console.error('Error al actualizar el producto:', error);
          }
        );
      } else {
        console.log('Formulario inválido');
      }
    }
}
