import { Component } from '@angular/core';
import { MarketplaceService } from '../../../services/marketplace/marketplace.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { Store } from '../../../models/store';

@Component({
  selector: 'app-vendors',
  standalone: true,
  imports: [RouterModule, NgIf, NgFor],
  templateUrl: './vendors.component.html',
  styleUrl: './vendors.component.scss'
})
export class VendorsComponent {

  stores: Store[] = []; 
  errorMessage: string = '';
  loading: boolean = true;

  storeId: string = ''; 
  sukValue: string = ''; 

  constructor(
    private _marketPlaceService: MarketplaceService,
    private _activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.fetchData();
    this.getStores(); 
  }

  fetchData() {
    this._activatedRoute.paramMap.subscribe(params => {
      this.storeId = params.get('id') || ''; 
      this.sukValue = params.get('suk') || ''; 
    });
  }

  getStores() {
    this._marketPlaceService.getStores().subscribe({

      next: (data : any) => {
        this.stores = data;  
        this.loading = false;
      },

      error: (error) => {
        this.errorMessage = error; 
        this.loading = false;
      }

    });
  }

}
