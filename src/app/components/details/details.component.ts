import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Product } from 'src/app/shared/interfaces/product';
import { CartService } from 'src/app/shared/services/cart.service';
import { EcomdataService } from 'src/app/shared/services/ecomdata.service';
import { WishlistService } from 'src/app/shared/services/wishlist.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  constructor(private _ActivatedRoute: ActivatedRoute, private _EcomdataService: EcomdataService, private _CartService: CartService, private _ToastrService: ToastrService, private _WishlistService: WishlistService) { }

  productDetails: Product = {} as Product;
  productDetailsImage: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 500,
    navText: ['', ''],
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
        items: 4
      }
    },
    nav: false
  }

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        let idProduct: any = params.get('id');
        console.log(idProduct);


        this._EcomdataService.getProductDetails(idProduct).subscribe({
          next: (response) => {
            this.productDetails = response.data;
            console.log(this.productDetails);
          }
        })


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
}
