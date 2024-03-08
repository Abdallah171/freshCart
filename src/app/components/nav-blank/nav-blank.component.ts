import { WishlistService } from 'src/app/shared/services/wishlist.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CartService } from 'src/app/shared/services/cart.service';
import { EcomdataService } from 'src/app/shared/services/ecomdata.service';
import { count } from 'rxjs';

@Component({
  selector: 'app-nav-blank',
  templateUrl: './nav-blank.component.html',
  styleUrls: ['./nav-blank.component.css']
})
export class NavBlankComponent {

  showCount: boolean = false;
  cartN: number = 0;
  wishN: number = 0;
  constructor(private _AuthService: AuthService, private _CartService: CartService, private _WishlistService: WishlistService) { }

  logOutUser(): void {
    this._AuthService.logOut();
  }

  ngOnInit(): void {

    this.showCount = true
    this._CartService.getUserCart().subscribe({
      next: (response) => {
        this.cartN = response.numOfCartItems;
        console.log(this.cartN);
      },


    })



    this._CartService.cartNumber.subscribe({

      next: (data) => {
        this.cartN = data
        console.log(this.cartN);

      }
    })




    this._WishlistService.getUserWishList().subscribe({

      next: (response) => {
        this.wishN = response.data.length;
        console.log(this.wishN);
      }
    })


    this.showCount = true

    this._WishlistService.wishListNumber.subscribe({

      next: (data) => {
        this.wishN = data

        // console.log(this.wishN);
      }
    })






  }


}


