import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AnimeListComponent } from './pages/anime-list/anime-list.component';
import { AnimeDetailComponent } from './pages/anime-detail/anime-detail.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { AnimeCreateComponent } from './pages/anime-create/anime-create.component';

@NgModule({
  declarations: [AppComponent, AnimeListComponent, AnimeDetailComponent, AnimeCreateComponent],
  imports: [BrowserModule, HttpClientModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
