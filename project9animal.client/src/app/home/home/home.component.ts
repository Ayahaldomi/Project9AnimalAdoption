import { Component } from '@angular/core';
import { UrlService } from '../../RamaURL/url.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
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
