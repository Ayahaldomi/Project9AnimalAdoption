import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RawaahServicesService } from '../../URL-serices/rawaah-services.service';

@Component({
  selector: 'app-edit-animals',
  templateUrl: './edit-animals.component.html',
  styleUrls: ['./edit-animals.component.css']
})
export class EditAnimalsComponent implements OnInit {
  param: any;
  imageFile: any;
  animalData: any; // متغير لتخزين بيانات الحيوان

  constructor(private _ser: RawaahServicesService, private _active: ActivatedRoute) {
    // الحصول على id من الـ URL
    this.param = this._active.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    // تحميل بيانات الحيوان عند تحميل المكون
    this.loadAnimalData();
  }

  loadAnimalData() {
    this._ser.getAnimalById(this.param).subscribe((data) => {
      this.animalData = data;
      this.imageFile = data.ServiceImage; 
    });
  }

  changeImageEvent(event: any) {
    this.imageFile = event.target.files[0];
  }

  UpdateAnimalsAdmin(data: any) {
    const form = new FormData();

  
    for (let key in data) {
      if (data.hasOwnProperty(key)) {
        form.append(key, data[key]);
      }
    }


    if (this.imageFile) {
      form.append("ServiceImage", this.imageFile);
    }


    this._ser.UpdateAnimalsAdmin(this.param, form).subscribe({
      next: (response) => {
        alert("Animal Updated Successfully");
      },
      error: (error) => {
        console.error("Error updating animal:", error);
        alert("An error occurred while updating the animal.");
      }
    });
  }
}
