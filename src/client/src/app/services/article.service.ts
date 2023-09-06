import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from '../models/Article';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(
    private http: HttpClient
  ) { }

  getArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(environment.apiUrl + "articles");
  }

  getArticle(key: string): Observable<Article> {
    return this.http.get<Article>(environment.apiUrl + "articles/" + key);
  }

}
