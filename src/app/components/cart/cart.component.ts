import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  constructor(private _CartService: CartService) { }


  cartDetails: any = {};


  ngOnInit(): void {
    this._CartService.getUserCart().subscribe({
      next: (response) => {

        this.cartDetails = response.data
        console.log(this.cartDetails.products);
      },
      error: (err) => {
        // console.log(err);
      }
    })

  }

  removeItem(id: string): void {
    this._CartService.removeCartItem(id).subscribe({
      next: (response) => {
        this.cartDetails = response.data;
        // console.log(this.cartDetails);
        this._CartService.cartNumber.next(response.numOfCartItems)

      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  changeCount(id: string, countProduct: number): void {
    if (countProduct > 0) {
      this._CartService.updateCartQuantity(id, countProduct).subscribe({
        next: (response) => {

          this.cartDetails = response.data
          console.log(this.cartDetails);
        },

      })

    }


  }

  clearCart(): void {
    this._CartService.clearAllCart().subscribe({
      next: (response) => {
        this.cartDetails = response
        console.log(this.cartDetails);
        this._CartService.cartNumber.next(response.numOfCartItems)

      },
      error: (err) => {
        console.log(err);
      }

    })
  }
}

