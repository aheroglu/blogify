import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/models/Article';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit {

  articles: Article[];
  p: number = 1;

  constructor(
    private articleService: ArticleService
  ) { }

  ngOnInit(): void {
    this.articleService.getArticles().subscribe(articles => {
      this.articles = articles;
    });
  }

}
