import { Brand } from './../../shared/interfaces/product';
import { Component, OnInit } from '@angular/core';
import { EcomdataService } from 'src/app/shared/services/ecomdata.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent implements OnInit {

  constructor(private _EcomdataService: EcomdataService) { }

  brands: Brand[] = [];
  specificBrand: any;
  clicked: boolean = false;

  ngOnInit(): void {
    this._EcomdataService.getAllBrands().subscribe({
      next: (response) => {
        this.brands = response.data;
        console.log(this.brands);
        // this.getClickedBrand();
      },
      error: (err) => {
        console.log(err);
      }
    })

  }
  getClickedBrand(id: string): void {
    this._EcomdataService.getSpecificBrand(id).subscribe({
      next: (response) => {
        this.specificBrand = response.data
        console.log(response);

        this.clicked = true;
      }
    })
  }


}
