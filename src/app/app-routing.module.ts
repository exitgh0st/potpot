import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnimeListComponent } from './pages/anime-list/anime-list.component';
import { AnimeDetailComponent } from './pages/anime-detail/anime-detail.component';
import { AnimeCreateComponent } from './pages/anime-create/anime-create.component';

const routes: Routes = [
  { path: 'anime', component: AnimeListComponent },
  { path: 'anime/:id', component: AnimeDetailComponent },
  { path: 'create-anime', component: AnimeCreateComponent },
  { path: '', pathMatch: 'full', redirectTo: 'anime' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
