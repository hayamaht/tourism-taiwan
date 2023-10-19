import { Routes } from '@angular/router';
import { HomePage } from './pages/home/home.page';
import { SpotsPage } from './pages/spots/spots.page';
import { ActivitiesPage } from './pages/activities/activities.page';

export const routes: Routes = [
  { path:'', component: HomePage },
  { path:'spots', component: SpotsPage },
  { path:'spots/:city', component: SpotsPage },
  { path:'activities', component: ActivitiesPage },
  { path:'activities/:city', component: ActivitiesPage },
];
