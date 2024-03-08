import { Component } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CartService } from 'src/app/shared/services/cart.service';
import { EcomdataService } from 'src/app/shared/services/ecomdata.service';

@Component({
  selector: 'app-allorders',
  templateUrl: './allorders.component.html',
  styleUrls: ['./allorders.component.css']
})
export class AllordersComponent {
  userData: any;
  userId: string = ''
  allOrders: any = [];

  constructor(private _EcomdataService: EcomdataService, private _AuthService: AuthService) { }

  ngOnInit(): void {


    if (localStorage.getItem('eToken') != null) {
      let encodeToken: any = localStorage.getItem('eToken');
      let decodeToken = jwtDecode(encodeToken)
      this.userData = decodeToken;
      this.userId = this.userData.id
      console.log(this.userId);

    }

    this._EcomdataService.getUserOrders(this.userId).subscribe({
      next: (res) => {
        this.allOrders = res
        console.log(this.allOrders.cartItems);
      }
    })
  }



}
