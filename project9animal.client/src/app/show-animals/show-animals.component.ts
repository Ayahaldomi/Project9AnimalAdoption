//import { Component, OnInit } from '@angular/core';
//import { RawaahServicesService } from '../URL-serices/rawaah-services.service';


//@Component({
//  selector: 'app-show-animals',
//  templateUrl: './show-animals.component.html',
//  styleUrls: ['./show-animals.component.css']
//})
//export class ShowAnimalsComponent implements OnInit {
//  animals: any[] = [];
//  loading: boolean = true;
//  filters = { categoryName: '', animalName: '', shelterName: '' };
//  constructor(private rawaahService: RawaahServicesService) { }

//  ngOnInit(): void {
//    this.getAllAnimals();
//    this.applyFilters(); 
//  }
//  getAllAnimals(): void {
//    this.rawaahService.getAllAnimals().subscribe({
//      next: (data) => {
//        console.log('Animals data:', data); // إضافة هذا السطر
//        this.animals = data;
//        this.loading = false;
//      },
//      error: (error) => {
//        console.error('Error loading animals:', error);
//        this.loading = false;
//      }
//    });
//  }

//  applyFilters() {
//    const { categoryName, animalName, shelterName } = this.filters;
//    this.rawaahService.getFilteredAnimals(categoryName, animalName, shelterName)
//      .subscribe(data => {
//        this.animals = data;
//      }, error => {
//        console.error('Error fetching animals:', error);
//      });
//  }
//  viewDetails(animalId: number): void {
//    this.rawaahService.getAnimalByID(animalId).subscribe(data => {

//      console.log(data);
//    });
//  }
//}import { Component, OnInit } from '@angular/core';import { Component, OnInit } from '@angular/core';import { Component, OnInit } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { RawaahServicesService } from '../URL-serices/rawaah-services.service';

@Component({
  selector: 'app-show-animals',
  templateUrl: './show-animals.component.html',
  styleUrls: ['./show-animals.component.css']
})
export class ShowAnimalsComponent implements OnInit {
  animals: any[] = [];  // مصفوفة لتخزين الحيوانات
  loading: boolean = true;  // حالة تحميل البيانات
  errorMessage: string = ''; // رسالة الخطأ في حالة حدوث مشكلة

  // فلترات البحث
  filters = {
    categoryName: '',
    name: '',  // هنا استخدمنا "name" بدلاً من "animalName"
    shelterName: ''
  };

  constructor(private rawaahService: RawaahServicesService) { }

  ngOnInit(): void {
    this.getAllAnimals();
    this.applyFilters;
  }

  getAllAnimals(): void {
    this.loading = true; 
    this.rawaahService.getAllAnimals().subscribe({
      next: (data) => {
        this.animals = data;  
        this.loading = false;  
      },
      error: (error) => {
        this.errorMessage = 'خطأ في تحميل الحيوانات. حاول مرة أخرى.';  
        console.error('Error loading animals:', error);  
        this.loading = false; 
      }
    });
  }
  applyFilters(): void {
    const { categoryName, name, shelterName } = this.filters;
    debugger;


    if (!categoryName && !name && !shelterName) {
      this.getAllAnimals();
      return;
    }

    this.loading = true;


    this.rawaahService.getFilteredAnimals(name, categoryName, shelterName).subscribe({
      next: (data) => {
        this.animals = data;
        this.loading = false; 
      },
      error: (error) => {
        this.errorMessage = 'خطأ في تطبيق الفلاتر. حاول مرة أخرى.';
        console.error('Error fetching animals:', error);
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
