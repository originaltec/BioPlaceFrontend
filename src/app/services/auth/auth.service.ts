import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceToken {

  private apiUrl = environment.apiUrl; 
  private tokenKey = 'JWToken'; 

  constructor(private http: HttpClient) { }

  /**
   * Logs in a user with the provided username and password.
   *
   * @param username - The username of the user.
   * @param password - The password of the user.
   * @returns An Observable that emits the server response.
   */
  login(username: string, password: string): Observable<any> {
    const loginPayload = { username, password };
    return this.http.post<any>(`${this.apiUrl}/api/login`, loginPayload);
  }

  /**
   * Saves the provided authentication token to the local storage.
   *
   * @param token - The authentication token to be saved.
   * @returns void
   */
  saveToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  /**
   * Retrieves the authentication token from the local storage.
   *
   * @returns {string | null} The authentication token if it exists, otherwise null.
   */
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  /**
   * Removes the authentication token from the local storage.
   * This method deletes the token associated with the key stored in `this.tokenKey`.
   * It is typically used to log out the user by clearing their session token.
   */
  removeToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  /**
   * Checks if the user is authenticated by verifying the presence of a token.
   *
   * @returns {boolean} True if a token exists, indicating the user is authenticated; otherwise, false.
   */
  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token;  
  }
}
