import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RawaahServicesService {
  private baseUrl ='https://localhost:7269/api';

  constructor(private http: HttpClient) { }

  getAllAnimals(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/Animals1/GetAnimals`);
  }



  getAnimalByID(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/Animals/${id}`);
  }


  filterAnimals(name: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/Animals/filter?name=${name}`);
  }


  getShelterByID(shelterId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/Shelters/${shelterId}`);
  }


  getAllShelters(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/Shelters`);
  }
}
