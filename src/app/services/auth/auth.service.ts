import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceToken {

  private apiUrl = 'https://localhost:7202'; 
  private tokenKey = 'JWToken'; 

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    const loginPayload = { username, password };
    return this.http.post<any>(`${this.apiUrl}/api/login`, loginPayload);
  }

  saveToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  removeToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token;  
  }
}
