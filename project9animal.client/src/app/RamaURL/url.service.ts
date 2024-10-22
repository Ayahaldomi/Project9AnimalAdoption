import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UrlService {
  private baseUrl = 'https://localhost:44376/api';


  constructor(private http: HttpClient) { }

  getAllCategoryAnimals(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/AnimalCategory/GetAllCategories`);
  }

  addNewNimalCategory(data: any): Observable<any> {
    debugger
    return this.http.post<any>(`${this.baseUrl}/AnimalCategory/AddCategory`, data)

  }
}