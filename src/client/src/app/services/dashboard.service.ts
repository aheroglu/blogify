import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Article } from '../models/Article';
import { environment } from 'src/environments/environment';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { About } from '../models/About';
import { Message } from '../models/Message';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(
    private http: HttpClient
  ) { }

  // Articles

  getArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(environment.apiUrl + "dashboard");
  }

  getArticle(key: string): Observable<Article> {
    return this.http.get<Article>(environment.apiUrl + "dashboard/" + key);
  }

  togglePublishStatus(id: number, article: any): Observable<any> {
    return this.http.put(environment.apiUrl + "dashboard/UpdatePublishStatus/" + id, article);
  }

  updateArticle(article: Article): Observable<Article> {
    return this.http.put<Article>(environment.apiUrl + "dashboard/" + article.id, article);
  }

  deleteArticle(id: number): Observable<any> {
    return this.http.delete<any>(environment.apiUrl + "dashboard/" + id);
  }

  createArticle(article: Article): Observable<Article> {
    return this.http.post<Article>(environment.apiUrl + "dashboard", article);
  }

  // About

  getAbout(id: number): Observable<About> {
    return this.http.get<About>(environment.apiUrl + "dashboard/GetAbout/" + id);
  }

  updateAbout(about: About): Observable<About> {
    return this.http.put<About>(environment.apiUrl + "dashboard/EditAbout/" + about.id, about);
  }

  // Messages

  getMessages(): Observable<Message[]> {
    return this.http.get<Message[]>(environment.apiUrl + "contact");
  }

  getMessage(id: string): Observable<Message> {
    return this.http.get<Message>(environment.apiUrl + "contact/" + id);
  }

  toggleReadStatus(id: number, message: Message): Observable<any> {
    return this.http.put(environment.apiUrl + "dashboard/UpdateReadStatus/" + id, message);
  }

}
