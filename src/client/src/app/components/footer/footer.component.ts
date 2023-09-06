import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  constructor(
    private authService: AuthService
  ) { }

  loggedIn() {
    return this.authService.loggedIn();
  }

}
