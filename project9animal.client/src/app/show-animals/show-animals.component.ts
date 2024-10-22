import { Component, OnInit } from '@angular/core';
import { RawaahServicesService } from '../URL-serices/rawaah-services.service';


@Component({
  selector: 'app-show-animals',
  templateUrl: './show-animals.component.html',
  styleUrls: ['./show-animals.component.css']
})
export class ShowAnimalsComponent implements OnInit {
  animals: any[] = [];
  loading: boolean = true;

  constructor(private rawaahService: RawaahServicesService) { }

  ngOnInit(): void {
    this.getAllAnimals();
  }
  getAllAnimals(): void {
    this.rawaahService.getAllAnimals().subscribe({
      next: (data) => {
        console.log('Animals data:', data); // إضافة هذا السطر
        this.animals = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading animals:', error);
        this.loading = false;
      }
    });
  }


  viewDetails(animalId: number): void {
    this.rawaahService.getAnimalByID(animalId).subscribe(data => {

      console.log(data);
    });
  }
}
