import { Routes } from '@angular/router';
import { HomePage } from './pages/home/home.page';
import { SpotsPage } from './pages/spots/spots.page';
import { ActivitiesPage } from './pages/activities/activities.page';
import { SpotDetailPage } from './pages/spot-detail/spot-detail.page';
import { ActivityDetailPage } from './pages/activity-detail/activity-detail.page';

export const routes: Routes = [
  { path:'', component: HomePage },
  { path:'spots', component: SpotsPage },
  { path:'spots/:city', component: SpotsPage },
  { path:'spot/:id', component: SpotDetailPage },
  { path:'activities', component: ActivitiesPage },
  { path:'activities/:city', component: ActivitiesPage },
  { path:'activity/:id', component: ActivityDetailPage },
];
