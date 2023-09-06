import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { About } from 'src/app/models/About';
import { AlertifyService } from 'src/app/services/alertify.service';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-edit-about',
  templateUrl: './edit-about.component.html',
  styleUrls: ['./edit-about.component.css']
})
export class EditAboutComponent implements OnInit {

  about: About;

  constructor(
    private dashboardService: DashboardService,
    private alertify: AlertifyService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAbout();
  }

  getAbout(id: number = 1) {
    this.dashboardService.getAbout(id).subscribe(about => {
      this.about = about;
    });
  }

  updateAbout(): void {
    this.dashboardService.updateAbout(this.about).subscribe(result => {
      this.alertify.success("About was updated successfully!");
      this.router.navigateByUrl("dashboard");
    });
  }

}
