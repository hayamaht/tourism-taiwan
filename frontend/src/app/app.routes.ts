import { Routes } from '@angular/router';
import { HomePage } from './pages/home/home.page';
import { SpotsPage } from './pages/spots/spots.page';

export const routes: Routes = [
  { path:'', component: HomePage },
  { path:'spots', component: SpotsPage }
];
