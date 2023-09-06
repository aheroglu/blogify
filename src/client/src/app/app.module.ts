import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { FooterComponent } from './components/footer/footer.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ArticleListComponent } from './components/article-list/article-list.component';
import { ArticleComponent } from './components/article/article.component';
import { JwtModule } from '@auth0/angular-jwt';
import { LoginComponent } from './components/login/login.component';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ArticleOverviewComponent } from './components/dashboard/article-overview/article-overview.component';
import { EditArticleComponent } from './components/dashboard/edit-article/edit-article.component';
import { AuthGuard } from './guards/auth-guard';
import { EditAboutComponent } from './components/dashboard/edit-about/edit-about.component';
import { QuillModule } from 'ngx-quill';
import { NgxPaginationModule } from 'ngx-pagination';
import { ContactComponent } from './components/contact/contact.component';
import { MessagesComponent } from './components/dashboard/messages/messages.component';
import { MessageDetailsComponent } from './components/dashboard/message-details/message-details.component';

export function tokenGetter() {
  return localStorage.getItem("token");
}

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    FooterComponent,
    NotFoundComponent,
    ArticleListComponent,
    ArticleComponent,
    LoginComponent,
    DashboardComponent,
    ArticleOverviewComponent,
    EditArticleComponent,
    EditAboutComponent,
    ContactComponent,
    MessagesComponent,
    MessageDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['localhost:7298'],
        disallowedRoutes: ['localhost:7298/api/auth']
      }
    }),
    QuillModule,
    NgxPaginationModule
  ],
  providers: [
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
