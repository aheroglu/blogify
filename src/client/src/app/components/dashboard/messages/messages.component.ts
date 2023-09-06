import { Component, OnInit } from '@angular/core';
import { Message } from 'src/app/models/Message';
import { AlertifyService } from 'src/app/services/alertify.service';
import { ContactService } from 'src/app/services/contact.service';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  messages: Message[];
  p: number = 1;

  constructor(
    private contactService: ContactService,
    private dashboardService: DashboardService,
    private alertify: AlertifyService
  ) { }

  ngOnInit(): void {
    this.getMessages();
  }

  getMessages() {
    this.dashboardService.getMessages().subscribe(messages => {
      this.messages = messages;
    })
  }

  toggleReadState(message: any): void {
    this.dashboardService.toggleReadStatus(message.id, message).subscribe(response => {
      this.alertify.success("Message was saved as read");
      this.getMessages();
    }, error => {
      this.alertify.error(error);
    });
  }

}
