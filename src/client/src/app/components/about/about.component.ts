import { Component, OnInit } from '@angular/core';
import { About } from 'src/app/models/About';
import { AboutService } from 'src/app/services/about.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  about: About;

  constructor(
    private aboutService: AboutService
  ) { }

  ngOnInit(): void {
    this.aboutService.getAbout(1).subscribe(about => {
      this.about = about;
    });
  }

}
