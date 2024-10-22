import { Component } from '@angular/core';
import { RawaahServicesService } from '../../URL-serices/rawaah-services.service';

@Component({
  selector: 'app-add-animals',
  templateUrl: './add-animals.component.html',
  styleUrl: './add-animals.component.css'
})
export class AddAnimalsComponent {
  ngOnInit() {

  }

  constructor(private _ser: RawaahServicesService) { }


  image: any
  changeImage(event: any) {
    debugger
    this.image = event.target.files[0]

  }


  addAnimalsAdmin(data: any) {

    var form = new FormData();

    for (let key in data) {
      form.append(key, data[key])
    }

    form.append("Animals Image", this.image)

    this._ser.addAnimalsAdmin(form).subscribe(() => {
      alert("Animals added successfully")
    })
  }
}
