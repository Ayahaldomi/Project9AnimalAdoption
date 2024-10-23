import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LeenURLService {
 
  constructor(private http: HttpClient) { }

    addUser(data : any) : Observable < any > {
      return this.http.post<any>(`https://localhost:7269/api/Users/AddUser`, data);
  }

    login(data: any): Observable<any> {
    return this.http.post<any>(`https://localhost:7269/api/Users/login`, data);
  }

  getUsers(): Observable<any> {
    return this.http.get(`https://localhost:7269/api/Users/GetUserById`);
  }
  
}
