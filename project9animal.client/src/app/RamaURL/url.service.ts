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
  getAllTestmonials(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/Home/GetTestimonials`);
  }

  getTopSuccessStories(): Observable<any> {
    debugger
    return this.http.get(`${this.baseUrl}/Home/top`);
  }
  deleteCategory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/AnimalCategory/DeleteCategory${id}`);
  }
  UpdateCategory(id: number, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/AnimalCategory/UpdateCategory/${id}`, data);
  }
}
