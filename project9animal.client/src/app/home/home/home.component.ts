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
    this.getAllTestmonials();
    this.getTopSuccessStories();
  }
  constructor(private _ser: UrlService) { }

  categories: any
  getAllCategoryAnimals() {
    
    this._ser.getAllCategoryAnimals().subscribe((data) => {
      
      this.categories = data;
      console.log(this.categories)
    })
  }
  testmonials: any
  getAllTestmonials() {
    
    this._ser.getAllTestmonials().subscribe((data) => {
      
      this.testmonials = data;
      console.log(this.testmonials)

    })
  }

  stories: any
  getTopSuccessStories() {
    
    this._ser.getTopSuccessStories().subscribe((data) => {
      
      this.stories = data;
      console.log(this.stories)

    })
  }
}
