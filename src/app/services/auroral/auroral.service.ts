import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Product } from '../../models/product';

@Injectable({
  providedIn: 'root',
})
export class AuroralService {

  private _apiUrl: string = 'https://bioplace-auroral-node.spaincentral.cloudapp.azure.com';
  private _username: string = 'juan@originaltec.com'; 
  private _password: string = 'Tfcpass@2024'; 

  /**
   * Creates an instance of AuroralService.
   * 
   * @param http - The HttpClient instance used to make HTTP requests.
   */
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
        "title": product.name.toString(),
        "adapterId": product.name.toString().replace(/[^a-zA-Z0-9-]/g, ''),
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
        return throwError(() => error);
      })
    );
  }

  /**
   * Fetches the list of products from the API.
   *
   * This method sends a GET request to the API endpoint for product registration,
   * using Basic Authentication with the provided username and password.
   *
   * @returns {Observable<any>} An observable that emits the response from the API.
   * If an error occurs during the request, it logs the error to the console and
   * returns an observable that throws the error.
   */
  getProducts(): Observable<any> {
    const basicAuth = btoa(`${this._username}:${this._password}`);
  
    const headers = new HttpHeaders({
      'Authorization': `Basic ${basicAuth}`,
    });
  
    return this.http.get(`${this._apiUrl}/api/registration`, { headers }).pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  /**
   * Retrieves a product by its ID.
   *
   * @param {string} id - The ID of the product to retrieve.
   * @returns {Observable<any>} An observable containing the product data.
   *
   * @throws Will throw an error if the product retrieval fails.
   */
  getProduct(id: string): Observable<any> {
    const basicAuth = btoa(`${this._username}:${this._password}`);
  
    const headers = new HttpHeaders({
      'Authorization': `Basic ${basicAuth}`,
    });
  
    return this.http.get(`${this._apiUrl}/api/registration/${id}`, { headers }).pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  /**
   * Fetches item data from the API using the provided identifiers.
   *
   * @param id - The ID of the item.
   * @param oid - The OID of the item.
   * @param pid - The PID of the item.
   * @returns An Observable containing the item data.
   *
   * @throws Will throw an error if the HTTP request fails.
   */
  getItemData(id: string, oid: string, pid: string): Observable<any> {
    const basicAuth = btoa(`${this._username}:${this._password}`);
  
    const headers = new HttpHeaders({
      'Authorization': `Basic ${basicAuth}`,
    });
  
    return this.http.get(`${this._apiUrl}/api/properties/${id}/${oid}/${pid}`, { headers }).pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

}
