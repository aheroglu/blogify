import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/services/alertify.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {

  constructor(
    private authService: AuthService,
    private alertify: AlertifyService,
    private router: Router
  ) { }

  loggedIn() {
    return this.authService.loggedIn();
  }

  logOut() {
    localStorage.removeItem("token");
    this.alertify.warning("Log Out");
    this.router.navigateByUrl('/');
  }

}
