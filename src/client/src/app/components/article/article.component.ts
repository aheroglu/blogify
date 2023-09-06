import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from 'src/app/models/Article';
import { ArticleService } from 'src/app/services/article.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  article: Article = new Article();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private articleService: ArticleService,
    private titleService: Title,
    private meta: Meta
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const key = params['key'];

      this.articleService.getArticle(key).subscribe(article => {
        this.displayArticle(article);
      });
    });
  }

  displayArticle(article: Article): void {
    if (article === null) {
      this.router.navigate(['/404']);
      return;
    }

    this.article = article;
    this.titleService.setTitle(
      `${this.article.title} - ${environment.title}`
    );
    this.meta.addTags([
      { name: 'description', content: this.article.description },
      { name: 'og:title', content: `${this.article.title} - ${environment.title}` },
      { name: 'og:type', content: 'website' },
      { name: 'og:url', content: environment.apiUrl + this.article.key },
      { name: 'og:image', content: this.article.image },
      { name: 'og:description', content: this.article.description },
      { name: 'og:sitename', content: environment.title }
    ]);
  }

}
