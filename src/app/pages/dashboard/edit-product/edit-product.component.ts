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
  styleUrl: './edit-product.component.scss'
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
        inStock: new FormControl('', Validators.required) 
      });

      this.productId = Number(this._route.snapshot.paramMap.get('id'));

      if (this.productId) {
        this._marketplaceService.getWooProductById(this.productId).subscribe(
          (response: Product) => {
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

    update(): void {
      if (this.productForm.valid && this.product) {
        
        const { inStock } = this.productForm.value;
        this.product[0].inStock = inStock == 'true';
        
        console.log(this.product[0].inStock);

        // this._marketplaceService.updateProduct(Number(this.productId), this.product[0]).subscribe(
        //   (response) => {
        //     console.log('Producto actualizado con éxito', response);
        //   },
        //   (error) => {
        //     console.error('Error al actualizar el producto:', error);
        //   }
        // );
      } else {
        console.log('Formulario inválido');
      }
    }
}
