import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Category, Product } from 'src/app/shared/interfaces/product';
import { CartService } from 'src/app/shared/services/cart.service';
import { EcomdataService } from 'src/app/shared/services/ecomdata.service';
import { WishlistService } from 'src/app/shared/services/wishlist.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})

export class ProductsComponent implements OnInit {

  constructor(private _EcomdataService: EcomdataService, private _CartService: CartService, private _ToastrService: ToastrService, private _WishlistService: WishlistService) { }


  products: Product[] = []
  wishListItems: any[] = [];
  searchTerm: string = '';





  ngOnInit(): void {
    this._EcomdataService.getAllProducts().subscribe({
      next: (response) => {

        this.products = response.data;
        // console.log(this.products);
      },
      error: (err) => {
        console.log(err);
      }
    })

    this._WishlistService.getUserWishList().subscribe({
      next: (response) => {
        const newData = response.data.map((item: any) => item._id);
        this.wishListItems = newData
        // console.log(this.wishListItems);
      }
    })

  }


  addCart(id: string): void {
    this._CartService.addToCart(id).subscribe({
      next: (response) => {

        console.log(response);
        this._ToastrService.success(response.message, 'Fresh Cart')
        this._CartService.cartNumber.next(response.numOfCartItems)

      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  addTolist(id: string) {
    this._WishlistService.addToWishList(id).subscribe({
      next: (response) => {
        this.wishListItems = response.data;
        console.log(this.wishListItems);
        this._ToastrService.success(response.message, 'Wish List')
        this._WishlistService.wishListNumber.next(response.data.length)

      }
    })
  }
  removeFromList(id: string): void {
    this._WishlistService.RemoveFromWishList(id).subscribe({
      next: (response) => {
        this.wishListItems = response.data;
        console.log(this.wishListItems);
        this._ToastrService.success(response.message, 'Removed')
        this._WishlistService.wishListNumber.next(response.data.length)


      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}