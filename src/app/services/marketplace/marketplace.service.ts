import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Product } from '../../models/product';

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

  getWooProducts(): Observable<any> {
    return this._httpClient.get<any>(`${this._url}/api/Product/allwoo`, this.getHttpOptions()).pipe(
      map((response) => response as Product), 
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
