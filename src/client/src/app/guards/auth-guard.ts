import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { AlertifyService } from "../services/alertify.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertify: AlertifyService
  ) { }

  canActivate() {
    if (this.authService.loggedIn()) {
      return true;
    }

    this.alertify.warning("Please log in");
    this.router.navigate(["/login"]);
    return false;
  }

}
