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

    loading : boolean = false;

    /**
     * Constructs an instance of EditProductComponent.
     * 
     * @param _route - Service to handle route parameters.
     * @param _marketplaceService - Service to interact with the marketplace API.
     * @param _formBuilder - Service to create and manage forms.
     * @param _router - Service to navigate between routes.
     */
    constructor(
      private _route: ActivatedRoute,
      private _marketplaceService : MarketplaceService,
      private _formBuilder : FormBuilder,
      private _router : Router
    ) {}

    /**
     * Initializes the component by setting up the product form and fetching the product details if a product ID is present in the route parameters.
     * 
     * - Creates a form group with a `stock_quantity` control, which is required and must have a minimum value of 0.
     * - Retrieves the product ID from the route parameters.
     * - If a product ID is found, fetches the product details from the marketplace service and populates the form with the product's stock quantity.
     * - Logs an error to the console if there is an issue fetching the product details.
     */
    ngOnInit(): void {
      this.productForm = this._formBuilder.group({
        stock_quantity: new FormControl('', [Validators.required, Validators.min(0)])
      });

      this.productId = Number(this._route.snapshot.paramMap.get('id'));

      if (this.productId) {
        this._marketplaceService.getWooProductById(this.productId).subscribe(
          (response: any) => {
            this.product = response;

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

    /**
     * Updates the product information.
     * 
     * This method sets the loading state to true, validates the product form, and updates the product description
     * with the stock quantity. It then calls the marketplace service to update the product information.
     * 
     * @returns {void}
     * 
     * @remarks
     * - The method checks if the product form is valid and if the product exists.
     * - It modifies the product description by removing any paragraph tags with specific attributes and appending
     *   a new paragraph with the stock quantity.
     * - The marketplace service is called to update the product with the new stock quantity and description.
     * - The loading state is set to false after the update operation, regardless of success or failure.
     */
    update(): void {
      this.loading = true;
      
      if (this.productForm.valid && this.product) {

        const { stock_quantity } = this.productForm.value;
        let { description } = this.product[0];

        description = description.replace(/<p[^>]*(id|class)=["'][^"']*["'][^>]*>.*?<\/p>(?=[^<p>]*$)/s, '');
        description += `<p id="stock-info" class="stock-class"><strong>Stock del MarketPlace ${stock_quantity}</strong></p>`;
    
        this._marketplaceService.updateProduct(Number(this.productId), stock_quantity, description).subscribe(
          (response) => {
            this.loading = false;
          },
          (error) => {
            this.loading = false;
          }
        );
      } else {
        this.loading = false;
      }
    }
}
