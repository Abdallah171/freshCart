import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EcomdataService {

  constructor(private _HttpClient: HttpClient) { }


  getAllProducts(): Observable<any> {
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/products`)
  }


  getProductDetails(id: string): Observable<any> {
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
  }
  getCategories(): Observable<any> {
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/categories`)
  }
  getSubcategoriesOnCategory(id: string): Observable<any> {
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`)
  }

  getAllBrands(): Observable<any> {
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/brands`)
  }

  getSpecificBrand(id: string): Observable<any> {
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`)
  }

  getUserOrders(id: string): Observable<any> {
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`)
  }



}

