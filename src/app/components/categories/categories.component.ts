import { Component, OnInit } from '@angular/core';
import { Category, Subcategory } from 'src/app/shared/interfaces/product';
import { EcomdataService } from 'src/app/shared/services/ecomdata.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categories: Category[] = [];
  subCategories: Subcategory[] = [];
  clicked: boolean = false;


  constructor(private _EcomdataService: EcomdataService) { }


  ngOnInit(): void {
    this._EcomdataService.getCategories().subscribe({
      next: (response) => {
        this.categories = response.data;
        console.log(this.categories);
      },
      error: (err) => {
        console.log(err);
      }
    })

  }
  subCategory(id: string): void {
    this._EcomdataService.getSubcategoriesOnCategory(id).subscribe({
      next: (response) => {
        this.clicked = true;

        this.subCategories = response.data;
        console.log(this.subCategories);
      }
    })
  }
}
