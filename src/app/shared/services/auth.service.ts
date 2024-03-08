import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _HttpClient: HttpClient, private _Router: Router) { }
  userData: string | null = null;

  logOut(): void {
    localStorage.removeItem('eToken');
    this._Router.navigate(['/login']);
  }

  saveDecodeUserData() {
    if (localStorage.getItem('eToken') != null) {
      let encodeToken: any = JSON.stringify(localStorage.getItem('eToken'));
      let decodeToken: string | any = jwtDecode(encodeToken)
      this.userData = decodeToken;
      console.log(decodeToken);


    }
  }



  setRegister(userData: object): Observable<any> {
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, userData)
  }

  setLogin(userData: object): Observable<any> {
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, userData)
  }

  forgotPassword(userData: object): Observable<any> {
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`, userData)
  }
  verifyCode(userData: object): Observable<any> {
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`, userData)
  }
  resetPassword(userData: object): Observable<any> {
    return this._HttpClient.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`, userData)
  }


}
