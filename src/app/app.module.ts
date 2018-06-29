import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BeersComponent } from './beers/beers.component';
import { BeerModule } from './beer/beer.module';
import { HomeComponent } from './home/home.component';

import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { SearchComponent } from './search/search.component';
import { BookService } from './search/book.service';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'beers',
    component: BeersComponent
  },
  {
    path: 'search',
    component: SearchComponent
  },
  {
    path: '**',  // ワイルドカードも使えます
    component: NotFoundComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    BeersComponent,
    HomeComponent,
    NotFoundComponent,
    SearchComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    BeerModule,
    RouterModule.forRoot(routes),
    HttpClientModule
  ],
  bootstrap: [ AppComponent ],
  providers: [ BookService ]
})
export class AppModule {
}
