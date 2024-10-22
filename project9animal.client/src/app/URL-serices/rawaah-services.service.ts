import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RawaahServicesService {
  private baseUrl = 'https://localhost:7269/api';

  constructor(private http: HttpClient) { }

  getAllAnimals(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/Animals1/GetAnimals`);
  }


  getAnimalById(id: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/Animals1/GetAnimal1/${id}`);
  }


  getFilteredAnimals(
    name: string = '',
    categoryName: string = '',
    shelterName: string = ''
  ): Observable<any[]> {
    let params = new HttpParams();

    console.log('Filtering with:', { name, categoryName, shelterName });

    if (name) params = params.set('animalName', name);
    if (categoryName) params = params.set('categoryName', categoryName);
    if (shelterName) params = params.set('shelterName', shelterName);

    return this.http.get<any[]>(`${this.baseUrl}/Animals1/Filter`, { params });
  }


  
  getShelterByID(shelterId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/Shelters/${shelterId}`);
  }


  getAllShelters(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/Shelters`);
  }



  getAllAnimalsAdmin(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/Animals1`);
  }
  UpdateAnimalsAdmin(id: number, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/Animals1/UpdateAnimal1/${id}`, data);
  }


  addAnimalsAdmin(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/Animals1/AddAnimal`, data);
  }




}

