import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnimeCollectionComponent } from './pages/anime-collection/anime-collection.component';

const routes: Routes = [
  { path: '', component: AnimeCollectionComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
