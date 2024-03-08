import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/shared/services/cart.service';
import { EcomdataService } from 'src/app/shared/services/ecomdata.service';
import { WishlistService } from 'src/app/shared/services/wishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent {
  constructor(private _WishlistService: WishlistService, private _CartService: CartService, private _ToastrService: ToastrService) { }

  wishListItems: any[] = [];
  dddd() {
    this._WishlistService.getUserWishList().subscribe({
      next: (response) => {

        this.wishListItems = response.data
        console.log(this.wishListItems);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
  ngOnInit(): void {
    this._WishlistService.getUserWishList().subscribe({
      next: (response) => {

        this.wishListItems = response.data
        console.log(this.wishListItems);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  removeItem(id: string): void {
    this._WishlistService.RemoveFromWishList(id).subscribe({
      next: (response) => {
        this.dddd();
        this.wishListItems = response.data;
        this._WishlistService.wishListNumber.next(response.data.length)

      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  addCart(id: string): void {
    this._CartService.addToCart(id).subscribe({
      next: (response) => {
        this.removeItem(id);

        this._ToastrService.success(response.message, 'Fresh Cart')
        this._CartService.cartNumber.next(response.numOfCartItems)

      },
      error: (err) => {
        console.log(err);
      }
    })
  }



}
