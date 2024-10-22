import { Component } from '@angular/core';
import { UrlService } from '../../RamaURL/url.service';

@Component({
  selector: 'app-get-all-category',
  templateUrl: './get-all-category.component.html',
  styleUrl: './get-all-category.component.css'
})
export class GetAllCategoryComponent {
  ngOnInit() {
    this.getAllCategoryAnimals();
  }
  constructor(private _ser: UrlService) { }

  categories: any
  getAllCategoryAnimals() {
    debugger
    this._ser.getAllCategoryAnimals().subscribe((data) => {
      debugger
      this.categories = data;
      console.log(this.categories)
    })
  }
}
