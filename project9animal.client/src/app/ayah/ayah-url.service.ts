import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AyahURLService {

  constructor(private http: HttpClient) { }

  staticData = 'https://localhost:7269/api/OurCommunityDetails'

  getSeccessStoryByID(id: any): Observable<any> {
    return this.http.get<any>(`${this.staticData}/getSeccessStoryByID/${id}`)
  }

  getLikes(id: any): Observable<any> {
    return this.http.get<any>(`${this.staticData}/likes/${id}`)
  }

  getComments(id: any): Observable<any> {
    return this.http.get<any>(`${this.staticData}/comments/${id}`)
  }

  getCommentCount(id: any): Observable<any> {
    return this.http.get<any>(`${this.staticData}/commentsCount/${id}`)
  }

  postLike(data: any): Observable<any> {
    return this.http.post<any>(`${this.staticData}/addLike`, data)
  }

}