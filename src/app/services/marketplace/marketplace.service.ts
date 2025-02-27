import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Product, Store } from '../../models/product';
import { Order } from '../../models/order';
import { AuthServiceToken } from '../auth/auth.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MarketplaceService {

  private _apiUrl : string = environment.apiUrl;

  constructor(
    private _httpClient : HttpClient,
    private _router : Router,
    private authService: AuthServiceToken
  ) { }

  getHttpOptions () {
    const token = this.authService.getToken(); 
    if (!token) {
      this._router.navigate(['/sign-in']);
      throw new Error('Usuario no autenticado. Redirigiendo a inicio de sesión.');
    }

    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` 
      })
    };
  }

  getCategories () {
    return this._httpClient.get<any>(`${this._apiUrl}/GetCategories`, this.getHttpOptions()).pipe(
      map((response) => response as any), 
      catchError(this.handleError)  
    );
  }

  getCategory (id : number) {
    return this._httpClient.get<any>(`${this._apiUrl}/GetCategory/${id}`, this.getHttpOptions()).pipe(
      map((response) => response as Product), 
      catchError(this.handleError)  
    );
  }

  getWooProducts(): Observable<any> {
    return this._httpClient.get<any>(`${this._apiUrl}/api/Product/allwoo`, this.getHttpOptions()).pipe(
      map((response) => response as Product), 
      catchError(this.handleError)  
    );
  }

  getWooProductById(id: number): Observable<any> {
    return this._httpClient.get<any>(`${this._apiUrl}/api/Product/${id}`, this.getHttpOptions()).pipe(
      map((response) => response as any), 
      catchError(this.handleError)  
    );
  }

  updateProduct(idProduct: number, stock_quantity: number, description: string = ''): Observable<any> {
    const contentUpdate : any = { stock_quantity: stock_quantity, description: description };

    return this._httpClient.put<any>(`${this._apiUrl}/api/Product/${idProduct}`, contentUpdate, this.getHttpOptions()).pipe(
        map((response) => response as Product),
        catchError(this.handleError)
    );
  }

  updateDescription(idProduct: number, text : string) : Observable<any> {
    const updatedDescription : any = {description : text};

    return this._httpClient.put<any>(`${this._apiUrl}/api/Product/${idProduct}`, updatedDescription, this.getHttpOptions()).pipe(
      map((response) => response as Product),
      catchError(this.handleError)
    );
  }

  getOrders () : Observable<any> {
    return this._httpClient.get<any>(`${this._apiUrl}/api/Order/GetOrders`, this.getHttpOptions()).pipe(
      map((response) => response as Order), 
      catchError(this.handleError)  
    );
  }

  /**
   * Retrieves an order by its ID.
   *
   * @param {number} id - The ID of the order to retrieve.
   * @returns {Observable<any>} An observable containing the order data.
   */
  getOrderById (id : number) : Observable<any> {
    return this._httpClient.get<any>(`${this._apiUrl}/api/Order/GetOrderById/${id}`, this.getHttpOptions()).pipe(
      map((response) => response as Order), 
      catchError(this.handleError)  
    );
  }

  /**
   * Retrieves a list of stores from the server.
   *
   * @returns {Observable<Store[]>} An observable containing an array of Store objects.
   */
  getStores(): Observable<Store[]> {
    return this._httpClient.get<Store[]>(`${this._apiUrl}/api/Store/GetStores`, this.getHttpOptions()).pipe(
      map((response) => response as Store[]), 
      catchError(this.handleError)
    );
  }

  /**
   * Retrieves a store by its unique identifier.
   *
   * @param {number} id - The unique identifier of the store to retrieve.
   * @returns {Observable<Store>} An observable containing the store data.
   *
   * @remarks
   * This method sends an HTTP GET request to the server to fetch the store details.
   * The response is mapped to a `Store` object and any errors are handled by `handleError`.
   */
  getStoreById(id: number): Observable<Store> {
    return this._httpClient.get<Store>(`${this._apiUrl}/api/Store/GetStoreById/${id}`, this.getHttpOptions()).pipe(
      map((response) => response as Store),
      catchError(this.handleError)
    );
  }

  /**
   * Handles HTTP errors and returns a user-friendly error message.
   *
   * @private
   * @param {HttpErrorResponse} error - The HTTP error response object.
   * @returns {Observable<never>} An observable that throws an error with a user-friendly message.
   */
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Ocurrió un error desconocido.';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
      console.log(errorMessage)
    } else {
      errorMessage = `Código de estado: ${error.status}, Mensaje: ${error.message}`;
    }
    return throwError(() => new Error(errorMessage));
  }
}
