import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Message } from '../models/Message';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(
    private http: HttpClient
  ) { }

  createMessage(message: Message): Observable<Message> {
    return this.http.post<Message>(environment.apiUrl + "contact", message);
  }

}
