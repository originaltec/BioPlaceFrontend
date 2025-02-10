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
        stockQuantity: new FormControl('', [Validators.required, Validators.min(0)])
      });

      this.productId = Number(this._route.snapshot.paramMap.get('id'));

      if (this.productId) {
        this._marketplaceService.getWooProductById(this.productId).subscribe(
          (response: Product) => {
            this.product = response;

            console.log(this.product);

            this.productForm.setValue({
              stockQuantity: this.product[0].stockQuantity || 0
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
        
        const { stockQuantity } = this.productForm.value;
        this.product[0].stockQuantity = stockQuantity;

        const tempProduct: Product = this.product[0];
        console.log(tempProduct);

        this._marketplaceService.updateProduct(Number(this.productId), tempProduct).subscribe(
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
