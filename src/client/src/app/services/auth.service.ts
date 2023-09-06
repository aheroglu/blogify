import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  jwtHelper = new JwtHelperService();
  decodedToken: any;

  constructor(
    private http: HttpClient
  ) { }

  login(model: any) {
    return this.http.post(environment.apiUrl + "auth/login", model).pipe(
      map((response: any) => {
        const result = response;
        if (result) {
          localStorage.setItem("token", result.token);
          this.decodedToken = this.jwtHelper.decodeToken(result.token);
        }
      })
    );
  }

  loggedIn() {
    const token = localStorage.getItem("token");
    return !this.jwtHelper.isTokenExpired(token);
  }

}
