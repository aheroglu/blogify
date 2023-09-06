import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleListComponent } from './components/article-list/article-list.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ArticleComponent } from './components/article/article.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EditArticleComponent } from './components/dashboard/edit-article/edit-article.component';
import { AuthGuard } from './guards/auth-guard';
import { EditAboutComponent } from './components/dashboard/edit-about/edit-about.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { MessagesComponent } from './components/dashboard/messages/messages.component';
import { MessageDetailsComponent } from './components/dashboard/message-details/message-details.component';

const routes: Routes = [
  { path: '', component: ArticleListComponent },
  { path: 'articles', component: ArticleListComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'dashboard/about', component: EditAboutComponent, canActivate: [AuthGuard] },
  { path: 'dashboard/messages', component: MessagesComponent, canActivate: [AuthGuard] },
  { path: 'dashboard/message/:key', component: MessageDetailsComponent, canActivate: [AuthGuard] },
  { path: 'dashboard/:key', component: EditArticleComponent, canActivate: [AuthGuard] },
  { path: 'dashboard/preview/:key', component: ArticleComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: ':key', component: ArticleComponent },
  { path: '404', component: NotFoundComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
