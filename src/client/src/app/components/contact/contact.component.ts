import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/services/alertify.service';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {

  model: any = {};

  constructor(
    private contactService: ContactService,
    private alertify: AlertifyService,
    private router: Router
  ) { }

  sendMessage() {
    this.contactService.createMessage(this.model).subscribe({
      next: () => {
        this.alertify.success("Your message was sent successfully!");
        this.router.navigateByUrl('/');
      },
      error: (error) => {
        this.alertify.error(error);
      }
    });
  }

}
