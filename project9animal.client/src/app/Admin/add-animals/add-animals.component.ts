import { Component, OnInit } from '@angular/core';
import { RawaahServicesService } from '../../URL-serices/rawaah-services.service';

@Component({
  selector: 'app-add-animals',
  templateUrl: './add-animals.component.html',
  styleUrls: ['./add-animals.component.css']
})
export class AddAnimalsComponent implements OnInit {
  categories: any[] = [];
  shelters: any[] = [];    
  image: any;

  selectedCategoryId: string | undefined; 
  selectedShelterId: string | undefined;  

  isLoading: boolean = false;  

  constructor(private _ser: RawaahServicesService) { }

  ngOnInit() {
    this.loadCategories();
    this.loadShelters();
  }

  loadCategories() {
    this._ser.getCategories().subscribe(
      (categories) => {
        this.categories = categories;
      },
      (error) => {
        alert('Error loading categories: ' + error.message);
      }
    );
  }

  loadShelters() {
    this._ser.getShelters().subscribe(
      (shelters) => {
        this.shelters = shelters;
      },
      (error) => {
        alert('Error loading shelters: ' + error.message);
      }
    );
  }

  changeImageEvent(event: any) {
    this.image = event.target.files[0];
  }

  addAnimalsAdmin(data: any) {
    // قم بإزالة التحقق من الحقول هنا
    const form = new FormData();
    
    if (this.selectedCategoryId) {
      form.append('CategoryId', this.selectedCategoryId);
    }
    
    if (this.selectedShelterId) {
      form.append('ShelterId', this.selectedShelterId);
    }

    for (let key in data) {
      if (data[key]) { // تحقق من أن القيمة ليست فارغة
        form.append(key, data[key]);
      }
    }

    if (this.image) {
      form.append('AnimalsImage', this.image);
    }

    this.isLoading = true;  // Start loading

    this._ser.addAnimalsAdmin(form).subscribe(
      () => {
        alert('Animal added successfully');
        this.resetForm();  
      },
      (error) => {
        alert('Error adding animal: ' + error.message);
      },
      () => {
        this.isLoading = false; 
      }
    );
  }

  resetForm() {
    this.selectedCategoryId = undefined;
    this.selectedShelterId = undefined;
    this.image = null;
  }
}
