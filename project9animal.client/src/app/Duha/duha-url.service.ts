import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DuhaUrlService {

  staticData = "https://localhost:7269/api"
  constructor(private http: HttpClient) { }

  getAnimalDetailsByAnimalId(id: any): Observable<any> {
    return this.http.get<any>(`${this.staticData}/AnimalsDetails/${id}`);
  }

  postAdoptionApplication(data: any): Observable<any> {
    return this.http.post<any>(`${this.staticData}/AdoptionForm/SubmitAdoptionApplication`, data)
  }

  getAllApplication(): Observable<any> {
    return this.http.get<any>(`${this.staticData}/AdoptionForm/GetAllApplications`)
  }
  getApplicationsByUserId(userId: any): Observable<any> {
    return this.http.get(`${this.staticData}/AdoptionForm/GetApplicationsByUserId/${userId}`);
  }

  getAllUser(): Observable<any> {
    return this.http.get<any>(`${this.staticData}/Users/GetAllUser`)

  }
}
