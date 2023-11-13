import { Routes } from '@angular/router';
import { HomePage } from './pages/home/home.page';
import { ActivitiesPage } from './pages/activities/activities.page';
import { LoginPage } from './pages/login/login.page';
import { RegisterPage } from './pages/register/register.page';
import { ProfilePage } from './pages/profile/profile.page';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path:'', component: HomePage },
  { path:'login', component: LoginPage },
  { path:'register', component: RegisterPage },
  {
    path:'user/:username', component: ProfilePage,
    canActivate: [authGuard],
    // children: [
    //   { path:'profile', component: ProfilePage, },
    //   { path:'settings', component: ProfilePage, },
    //   { path:'test', component: ProfilePage, },
    // ]
  },
  {
    path:'scenes',
    loadComponent: () => import('./pages/scenes/scenes.page')
      .then(m => m.ScenesPage)
  },
  {
    path:'activities',
    loadComponent: () => import('./pages/activities/activities.page')
      .then(m => m.ActivitiesPage) },
  {
    path:'ScenicSpot/:id',
    loadComponent: () => import('./pages/spot-detail/spot-detail.page')
      .then(m => m.SpotDetailPage)
  },
  {
    path:'Restaurant/:id',
    loadComponent: () => import('./pages/restaurant-detail/restaurant-detail.page')
      .then(m => m.RestaurantDetailPage)
  },
  {
    path:'Hotel/:id',
    loadComponent: () => import('./pages/hotel-detail/hotel-detail.page')
      .then(m => m.HotelDetailPage)
  },
  {
    path:'Activity/:id',
    loadComponent: () => import('./pages/activity-detail/activity-detail.page')
      .then(m => m.ActivityDetailPage)
  },
  {
    path:'search',
    loadComponent: () => import('./pages/search/search.page')
      .then(m=> m.SearchPage)
  },
  {
    path:'search/:search',
    loadComponent: () => import('./pages/search/search.page')
      .then(m=> m.SearchPage),
  },
  // { path:'bike', component: BikePage },
  // { path:'bike/:city', component: BikePage },
  // { path:'bike/:city/:name', component: BikeDetailPage },

  { path: '**', redirectTo: '', pathMatch: 'full'}
];
