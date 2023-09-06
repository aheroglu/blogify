import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Message } from 'src/app/models/Message';
import { AlertifyService } from 'src/app/services/alertify.service';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-message-details',
  templateUrl: './message-details.component.html',
  styleUrls: ['./message-details.component.css']
})
export class MessageDetailsComponent implements OnInit {

  message: Message;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private alertify: AlertifyService,
    private dashboardService: DashboardService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const key: string = params['key'];

      this.getMessage(key);
    })
  }

  getMessage(key: string) {
    this.dashboardService.getMessage(key).subscribe(message => {
      if (message === null) {
        this.alertify.error("Message not found!");
        this.router.navigateByUrl("404");
      }

      this.message = message;
    })
  }

}
