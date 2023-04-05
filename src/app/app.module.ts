import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AnimeListComponent } from './pages/anime-list/anime-list.component';
import { AnimeDetailComponent } from './pages/anime-detail/anime-detail.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

require('dotenv').config();

@NgModule({
  declarations: [AppComponent, AnimeListComponent, AnimeDetailComponent],
  imports: [BrowserModule, HttpClientModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
