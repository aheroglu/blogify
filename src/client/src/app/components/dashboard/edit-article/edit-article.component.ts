import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from 'src/app/models/Article';
import { AlertifyService } from 'src/app/services/alertify.service';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.css']
})

export class EditArticleComponent implements OnInit {

  article: Article;
  saved = false;
  isNew = false;

  titleLength = 50;
  descriptionLength = 100;
  titleError = false;
  descriptionError = false;


  constructor(
    private dashboardService: DashboardService,
    private router: Router,
    private route: ActivatedRoute,
    private alertify: AlertifyService
  ) { }

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      const key: string = params['key'];

      if (key !== "new") {
        this.getArticle(key);
      } else {
        this.article = new Article();
        this.article.isPublished = false;
        this.isNew = true;
      }
    })
  }

  getArticle(key: string) {
    this.dashboardService.getArticle(key).subscribe(article => {
      if (article === null) {
        this.alertify.error("Article not found!");
        this.router.navigateByUrl('404');
      }

      this.article = article;
    });
  }

  updateArticle(): void {
    if (this.article.title.length > this.titleLength) {
      this.alertify.error("'Title' must be can 50 characters!");
      return;
    }

    else if (this.article.description.length > this.descriptionLength) {
      this.alertify.error("'Description' must be can 100 characters!");
      return;
    }

    this.saved = false;

    this.dashboardService.updateArticle(this.article).subscribe(result => {
      this.alertify.success("Article was updated successfully!");
      this.router.navigateByUrl("dashboard");
      this.article = result;
      this.saved = true;
    });
  }

  viewPreview(): void {
    this.router.navigateByUrl('dashboard/preview/' + this.article.key);
  }

  deleteArticle(): void {
    this.saved = false;

    const deletionConfirmed = confirm(`Deletin '${this.article.title}.' Are you sure?`);

    if (deletionConfirmed) {
      this.dashboardService.deleteArticle(this.article.id).subscribe({
        next: () => {
          this.alertify.success("Article was deleted successfully!");
          this.router.navigateByUrl("dashboard");
        },
        error: (error) => {
          this.alertify.error(error);
        }
      });
    }
  }

  createArticle(): void {

    if (this.article.title.length > this.titleLength) {
      this.alertify.error("'Title' must be less than 50 characters!");
      this.titleError = true;
    }

    if (this.article.description.length > this.descriptionLength) {
      this.alertify.error("'Description' must be less than 100 characters!");
      this.descriptionError = true;
    }

    if (this.titleError || this.descriptionError) {
      return;
    }

    this.saved = false;
    this.article.createdDate = new Date();

    this.dashboardService.createArticle(this.article).subscribe(result => {
      this.article = result;
      this.saved = true;
      this.isNew = false;
      this.alertify.success("Article was created successfully!");
      this.router.navigateByUrl("dashboard");
    });
  }

  updateKey(): void {
    this.article.key = this.article.title.toLowerCase().replace(new RegExp(' ', 'g'), '-');
  }

}
