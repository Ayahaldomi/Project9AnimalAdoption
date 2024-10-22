import { Component, OnInit } from '@angular/core';
import { RawaahServicesService } from '../../URL-serices/rawaah-services.service';

@Component({
  selector: 'app-add-shelter',
  templateUrl: './add-shelter.component.html',
  styleUrls: ['./add-shelter.component.css']
})
export class AddShelterComponent implements OnInit {
  shelters: any[] = [];
  image: any;

  isLoading: boolean = false;

  constructor(private _ser: RawaahServicesService) { }

  ngOnInit() {
    this.loadShelters();
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

  addShelters(data: any) {
    const form = new FormData();

    for (let key in data) {
      if (data[key]) { // Ensure the value is not empty
        form.append(key, data[key]);
      }
    }

    if (this.image) {
      form.append('ShelterImage', this.image);
    }

    this.isLoading = true;  // Start loading

    this._ser.addShelters(form).subscribe(
      () => {
        alert('Shelter added successfully');
        this.resetForm();
      },
      (error) => {
        alert('Error adding shelter: ' + error.message);
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  resetForm() {
    this.image = null;
    // Reset any other fields if necessary
  }
}
