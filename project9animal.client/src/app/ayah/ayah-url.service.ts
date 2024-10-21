import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AyahURLService {

  constructor(private http: HttpClient) { }

  staticData = 'https://localhost:7269/api/OurCommunityDetails'

  getSeccessStoryByID(id: any) {
    return this.http.get<any>(`${this.staticData}/getSeccessStoryByID/${id}`)
  }

}
