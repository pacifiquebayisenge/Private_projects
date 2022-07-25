import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { GameComponent } from './pages/game/game.component';
import { SplashComponent } from './pages/splash/splash.component';
import { SuggestionComponent } from './pages/suggestion/suggestion.component';
import { GameConfigComponent } from './pages/game-config/game-config.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'game', component: GameComponent },
  { path: 'splash', component: SplashComponent },
  { path: 'config', component: GameConfigComponent },
  { path: 'suggestion', component: SuggestionComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
