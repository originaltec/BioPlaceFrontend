import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Product } from '../../models/product';

@Injectable({
  providedIn: 'root',
})
export class AuroralService {

  private _apiUrl: string = 'http://68.221.194.218:81';
  private _username: string = 'juan@originaltec.com'; 
  private _password: string = 'Tfcpass@2024'; 

  constructor(private http: HttpClient) {}

  registerProduct(product: Product): Observable<any> {

    const json = {
      "td": {
        "@context": [
          "https://www.w3.org/2019/wot/td/v1",
          {
            "adp": "https://auroral.iot.linkeddata.es/def/adapters#",
            "om": "http://www.ontology-of-units-of-measure.org/resource/om-2/",
            "geo": "http://www.w3.org/2003/01/geo/wgs84_pos#",
            "schema": "https://schema.org/"
          }
        ],
        "security": [
          "nosec_sc"
        ],
        "securityDefinitions": {
          "nosec_sc": {
            "scheme": "nosec"
          }
        },
        "title": "asdg",
        "adapterId": "asdgasd",
        "@type": "adp:Device",
        "domain": "Farming",
        "description": "Product Description",
        "properties": {
          "stock_quantity": {
            "title": product.stock_quantity?.toString() || "descripcion",
            "description": "Stock Quantity Description",
            "@type": "Unknown",
            "readOnly": true,
            "type": "integer",
            "forms": []
          },
          "price": {
            "title": product.price.toString() || "titulo",
            "description": "Price productos",
            "@type": "Unknown",
            "readOnly": true,
            "type": "integer",
            "forms": []
          }
        },
        "events": {}
      },
      "avatar": "string"
    };

    const basicAuth = btoa(`${this._username}:${this._password}`);

    const headers = new HttpHeaders({
      'Authorization': `Basic ${basicAuth}`
    });

    return this.http.post(`${this._apiUrl}/api/registration`, json, { headers }).pipe(
      catchError((error) => {
        console.error('Error registrando el producto:', error);
        return throwError(() => error);
      })
    );
  }

  getProducts(): Observable<any> {
    const basicAuth = btoa(`${this._username}:${this._password}`);
  
    const headers = new HttpHeaders({
      'Authorization': `Basic ${basicAuth}`,
    });
  
    return this.http.get(`${this._apiUrl}/api/registration`, { headers }).pipe(
      catchError((error) => {
        console.error('Error obteniendo los productos:', error);
        return throwError(() => error);
      })
    );
  }

  getProduct(id: string): Observable<any> {
    const basicAuth = btoa(`${this._username}:${this._password}`);
  
    const headers = new HttpHeaders({
      'Authorization': `Basic ${basicAuth}`,
    });
  
    return this.http.get(`${this._apiUrl}/api/registration/${id}`, { headers }).pipe(
      catchError((error) => {
        console.error('Error obteniendo el producto con oid:', error);
        return throwError(() => error);
      })
    );
  }

  getItemData(id: string, oid: string, pid: string): Observable<any> {
    const basicAuth = btoa(`${this._username}:${this._password}`);
  
    const headers = new HttpHeaders({
      'Authorization': `Basic ${basicAuth}`,
    });
  
    return this.http.get(`${this._apiUrl}/api/properties/${id}/${oid}/${pid}`, { headers }).pipe(
      catchError((error) => {
        console.error(`Error obtenint les dades de l'ítem amb id: ${id}, oid: ${oid}, pid: ${pid}`, error);
        return throwError(() => error);
      })
    );
  }

}
