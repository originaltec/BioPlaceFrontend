import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceToken } from '../auth/auth.service';
import { environment } from '../../../environments/environment';
import { catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private _apiUrl: string = environment.apiUrl;

  constructor(
    private _httpClient: HttpClient,
    private _router: Router,
    private authService: AuthServiceToken
  ) {}

  getHttpOptions() {
    const token = this.authService.getToken();
    if (!token) {
      this._router.navigate(['/sign-in']);
      throw new Error(
        'Usuario no autenticado. Redirigiendo a inicio de sesión.'
      );
    }

    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    };
  }

  getRoles() {
    return this._httpClient
      .get<any>(`${this._apiUrl}/api/Login/isadmin`, this.getHttpOptions())
      .pipe(
        map((response) => response as any),
        catchError(this.handleError)
      );
  }

  getUserId() {
    return this._httpClient
      .get<any>(`${this._apiUrl}/api/Login/userid`, this.getHttpOptions())
      .pipe(
        map((response) => response as any),
        catchError(this.handleError)
      );
  }

  getUsers(){
    return this._httpClient
      .get<any>(`${this._apiUrl}/api/Login/users`, this.getHttpOptions())
      .pipe(
        map((response) => response as any),
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
