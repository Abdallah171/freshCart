import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  headers: any = { token: localStorage.getItem('eToken') }
  wishListNumber: BehaviorSubject<number> = new BehaviorSubject(0)


  constructor(private _HttpClient: HttpClient) { }




  getUserWishList(): Observable<any> {

    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/wishlist`,
      { headers: this.headers },
    )
  }

  addToWishList(productId: string): Observable<any> {

    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,
      { "productId": productId },
      { headers: this.headers },
    )
  }

  RemoveFromWishList(productId: string): Observable<any> {

    return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
      { headers: this.headers },
    )
  }
}
