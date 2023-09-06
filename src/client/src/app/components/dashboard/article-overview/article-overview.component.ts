import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertifyService } from 'src/app/services/alertify.service';
import { Router } from '@angular/router';
import { Article } from 'src/app/models/Article';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-article-overview',
  templateUrl: './article-overview.component.html',
  styleUrls: ['./article-overview.component.css']
})
export class ArticleOverviewComponent implements OnInit {

  articles: Article[];
  p: number = 1;

  constructor(
    private alertify: AlertifyService,
    private dashboardService: DashboardService
  ) { }

  ngOnInit(): void {
    this.getArticles();
  }

  getArticles() {
    this.dashboardService.getArticles().subscribe(articles => {
      this.articles = articles;
    });
  }

  togglePublishState(article: any) {
    this.dashboardService.togglePublishStatus(article.id, article).subscribe(response => {
      if (article.isPublished) {
        this.alertify.success(article.title + " has been updated as unpublished");
      } else {
        this.alertify.success(article.title + " has been updated as published");
      }
      this.getArticles();
    }, error => {
      this.alertify.error(error);
    });
  }

}
