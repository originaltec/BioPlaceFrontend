import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MarketplaceService } from '../../../services/marketplace/marketplace.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-vendor',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './vendor.component.html',
  styleUrl: './vendor.component.scss',
})
export class VendorComponent {
  storeId: number | null = null;
  store: any | null = null;
  storeKeys: string[] = [];

  constructor(
    private _route: ActivatedRoute,
    private _marketplaceService: MarketplaceService
  ) {}

  ngOnInit(): void {
    this.storeId = Number(this._route.snapshot.paramMap.get('id'));

    if (this.storeId) {
      this._marketplaceService.getStoreById(this.storeId).subscribe(
        (response: any) => {
          this.store = response;

          console.log(response)

          this.storeKeys = Object.keys(response);
        },
        (error) => {
          console.error('Error al obtener la tienda:', error);
        }
      );
    }
  }

  convertToDisplay(value: any): string {

    if (typeof value === 'object') {
      if (Array.isArray(value)) {
        return value.length
          ? value.map((item) => JSON.stringify(item)).join(', ')
          : '[]';
      }
      return JSON.stringify(value);
    }
    return value ?? 'null';
  }
}
