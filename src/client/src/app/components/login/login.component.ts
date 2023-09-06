import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { AlertifyService } from 'src/app/services/alertify.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  model: any = {
    username: "defaultuser",
    password: "Default_user1"
  };

  constructor(
    private authService: AuthService,
    private alertify: AlertifyService,
    private router: Router
  ) { }

  login() {
    this.authService.login(this.model).subscribe({
      next: () => {
        this.alertify.success("Welcome!");
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        this.alertify.error(error);
      }
    });
  }

}
