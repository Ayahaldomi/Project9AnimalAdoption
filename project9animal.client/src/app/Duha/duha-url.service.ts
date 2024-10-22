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

 
}
