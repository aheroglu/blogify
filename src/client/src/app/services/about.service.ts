import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { About } from '../models/About';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AboutService {

  constructor(
    private http: HttpClient
  ) { }

  getAbout(id: number): Observable<About> {
    return this.http.get<About>(environment.apiUrl + "about/" + id);
  }

}
