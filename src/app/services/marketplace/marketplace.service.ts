import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Product, Store } from '../../models/product';
import { Order } from '../../models/order';

@Injectable({
  providedIn: 'root'
})
export class MarketplaceService {

  private _url : string = 'https://localhost:7202';

  constructor(private _httpClient : HttpClient,
    private _router : Router
  ) { }

  getHttpOptions () {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2Jpb3BsYWNlLmJpeiIsImlhdCI6MTczODY1OTk0OCwibmJmIjoxNzM4NjU5OTQ4LCJleHAiOjE3MzkyNjQ3NDgsImRhdGEiOnsidXNlciI6eyJpZCI6IjEzIn19fQ.3jR560oYLeMn_G97xdHCl3FjEGDyHr8jSLFP6aoXveg`
      })
    }
  }

  getCategories () {
    return this._httpClient.get<any>(`${this._url}/GetCategories`, this.getHttpOptions()).pipe(
      map((response) => response as any), 
      catchError(this.handleError)  
    );
  }

  getCategory (id : number) {
    return this._httpClient.get<any>(`${this._url}/GetCategory/${id}`, this.getHttpOptions()).pipe(
      map((response) => response as Product), 
      catchError(this.handleError)  
    );
  }

  getWooProducts(): Observable<any> {
    return this._httpClient.get<any>(`${this._url}/api/Product/allwoo`, this.getHttpOptions()).pipe(
      map((response) => response as Product), 
      catchError(this.handleError)  
    );
  }

  getWooProductById(id: number): Observable<any> {
    return this._httpClient.get<any>(`${this._url}/api/Product/${id}`, this.getHttpOptions()).pipe(
      map((response) => response as any), 
      catchError(this.handleError)  
    );
  }
  updateProduct(idProduct: number, stock_quantity: number, description: string = ''): Observable<any> {
    const contentUpdate : any = { stock_quantity: stock_quantity };

    if (description.length > 0) {
      contentUpdate.description = description;
    }

    return this._httpClient.put<any>(`${this._url}/api/Product/${idProduct}`, contentUpdate, this.getHttpOptions()).pipe(
        map((response) => response as Product),
        catchError(this.handleError)
    );
}

  updateDescription(idProduct: number, text : string) : Observable<any> {
    const updatedDescription : any = {description : text};

    return this._httpClient.put<any>(`${this._url}/api/Product/${idProduct}`, updatedDescription, this.getHttpOptions()).pipe(
      map((response) => response as Product),
      catchError(this.handleError)
    );
  }

  getOrders () : Observable<any> {
    return this._httpClient.get<any>(`${this._url}/api/Order/GetOrders`, this.getHttpOptions()).pipe(
      map((response) => response as Order), 
      catchError(this.handleError)  
    );
  }

  getOrderById (id : number) : Observable<any> {
    return this._httpClient.get<any>(`${this._url}/api/Order/GetOrderById/${id}`, this.getHttpOptions()).pipe(
      map((response) => response as Order), 
      catchError(this.handleError)  
    );
  }

  getStores(): Observable<Store[]> {
    return this._httpClient.get<Store[]>(`${this._url}/api/Store/GetStores`, this.getHttpOptions()).pipe(
      map((response) => response as Store[]), 
      catchError(this.handleError)
    );
  }

  getStoreById(id: number): Observable<Store> {

    return this._httpClient.get<Store>(`${this._url}/api/Store/GetStoreById/${id}`, this.getHttpOptions()).pipe(
      map((response) => response as Store),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Ocurrió un error desconocido.';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Código de estado: ${error.status}, Mensaje: ${error.message}`;
    }
    console.log(error);
    return throwError(() => new Error(errorMessage));
  }
  
}
