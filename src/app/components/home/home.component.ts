import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { Category, Product } from 'src/app/shared/interfaces/product';
import { CartService } from 'src/app/shared/services/cart.service';
import { EcomdataService } from 'src/app/shared/services/ecomdata.service';
import { WishlistService } from 'src/app/shared/services/wishlist.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private _EcomdataService: EcomdataService, private _CartService: CartService, private _ToastrService: ToastrService, private _WishlistService: WishlistService) { }


  products: Product[] = []
  categories: Category[] = [];
  wishListItems: any[] = [];
  searchTerm: string = '';


  categoriesSliderOption: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    autoplay: true,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 6
      }
    },
    nav: false
  }
  mainSlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    autoplay: true,
    items: 1,
    nav: false
  }

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

    this._EcomdataService.getCategories().subscribe({
      next: (response) => {
        // console.log(response.data);
        this.categories = response.data;
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
