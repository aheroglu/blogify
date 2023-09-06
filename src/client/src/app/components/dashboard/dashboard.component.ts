import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  constructor(
    private router: Router
  ) { }

  create(): void {
    this.router.navigate(['/dashboard/new']);
  }

  messages(): void {
    this.router.navigate(['dashboard/messages']);
  }

  editAbout(): void {
    this.router.navigate(['dashboard/about']);
  }

}
