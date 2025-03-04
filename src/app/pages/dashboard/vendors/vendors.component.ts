import { Component } from '@angular/core';
import { MarketplaceService } from '../../../services/marketplace/marketplace.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { Store } from '../../../models/store';
import { UsersService } from '../../../services/users/users.service';

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

  userId !: number;
  isAdmin !: boolean;

  constructor(
    private _marketPlaceService: MarketplaceService,
    private _activatedRoute: ActivatedRoute,
    private _usersService : UsersService
  ) {}

  ngOnInit() {
    this.fetchData();
    this.fetchUserId();
    this.fetchIsAdmin();
  }

  fetchUserId() {
    this._usersService.getUserId().subscribe(
      (response) => {
        this.userId = response.userId;

        this.getStores(); 
      },
      (error) => {
        console.log(error);
      }
    );
  }

  fetchIsAdmin () {
    this._usersService.getRoles().subscribe(
      (response) => {
        this.isAdmin = response.isAdmin;

      },
      (error) => {
        console.log(error);
      }
    );
  }

  /**
   * Fetches data based on route parameters.
   * Subscribes to the route parameters and retrieves the 'id' and 'suk' values.
   * Assigns the 'id' value to `storeId` and the 'suk' value to `sukValue`.
   */
  fetchData() {
    this._activatedRoute.paramMap.subscribe(params => {
      this.storeId = params.get('id') || ''; 
      this.sukValue = params.get('suk') || ''; 
    });
  }

  /**
   * Fetches the list of stores from the marketplace service and updates the component state.
   * 
   * This method subscribes to the `getStores` observable from the `_marketPlaceService`.
   * On successful data retrieval, it assigns the data to the `stores` property and sets `loading` to false.
   * In case of an error, it assigns the error message to the `errorMessage` property and sets `loading` to false.
   * 
   * @returns {void}
   */
  getStores() {
    this._marketPlaceService.getStores(this.userId).subscribe({

      next: (data : any) => {
        this.stores = data;  
        this.loading = false;
      
        console.log(data);
      },

      error: (error) => {
        this.errorMessage = error; 
        this.loading = false;
      }

    });
  }

}
