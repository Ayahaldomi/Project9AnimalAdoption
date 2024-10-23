import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LeenURLService {
 
  constructor(private http: HttpClient) { }

  UserId: BehaviorSubject<string> = new BehaviorSubject<string>("");
  UserIdObserve = this.UserId.asObservable();

    addUser(data : any) : Observable < any > {
      return this.http.post<any>(`https://localhost:7269/api/Users/AddUser`, data);
  }

    login(data: any): Observable<any> {
    return this.http.post<any>(`https://localhost:7269/api/Users/login`, data);
  }
  
}
