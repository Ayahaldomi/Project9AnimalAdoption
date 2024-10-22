import { Component } from '@angular/core';
import { UrlService } from '../../RamaURL/url.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrl: './update-category.component.css'
})
export class UpdateCategoryComponent {

  param: any; // ID from URL
  imageFile: any; // For image upload
  categoryData: any = {}; // Object to hold form data

  constructor(
    private _ser: UrlService,
    private _active: ActivatedRoute
  ) {
    this.param = this._active.snapshot.paramMap.get('id'); // Get ID from the route
  }

  ngOnInit() {
    if (this.param) {
      this.loadCategoryData(); // Load the category data if ID is present
    } else {
      alert('Category ID not found.');
    }
  }

  //// Load the current category data for the form
  loadCategoryData() {
    this._ser.getCategoryById(this.param!).subscribe(
      (data) => {
        this.categoryData = data; // Populate form with the existing data
      },
      (error) => {
        alert('Error loading category data: ' + error.message);
      }
    );
  }

  // When the user selects a new image
  changeImageEvent(event: any) {
    this.imageFile = event.target.files[0];
  }

  // Update the category
  updateCategory(data: any) {
    debugger
    const formData = new FormData(); // Create a FormData object

    // Append form fields
    for (let key in data) {
      if (data.hasOwnProperty(key)) {
        formData.append(key, data[key]);
      }
    }
    debugger
    // Append image file if selected
    if (this.imageFile) {
      formData.append('Image', this.imageFile); // 'Image' matches the DTO field
    }

    // Call the service to update the category
    this._ser.UpdateCategory(this.param!, formData).subscribe(
      (response) => {
        alert('Category updated successfully!');
      },
      (error) => {
        alert('Error updating category: ' + error.message);
      }
    );
  }
}
