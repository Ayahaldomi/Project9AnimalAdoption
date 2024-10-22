import { Component } from '@angular/core';
import { UrlService } from '../../RamaURL/url.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-animal-category',
  templateUrl: './add-animal-category.component.html',
  styleUrl: './add-animal-category.component.css'
})
export class AddAnimalCategoryComponent {

  ngOnInit(){

  }
  constructor(private _ser: UrlService, private _router: Router) { }
  image: any
  changeImage(event: any) {

    debugger
    this.image = event.target.files[0]

  }


  addNewNimalCategory(data: any) {

    debugger
    var form = new FormData();
    debugger
    for (let key in data) {
      form.append(key, data[key])
    }
    form.append("Image", this.image);
   

    this._ser.addNewNimalCategory(form).subscribe(() => {

      debugger
      alert("animal category added succesfully")
     

    },
      (error) => {
        alert(error.error)
      })
  }

}
