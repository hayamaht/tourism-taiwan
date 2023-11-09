import { Routes } from '@angular/router';
import { HomePage } from './pages/home/home.page';
import { SpotsPage } from './pages/spots/spots.page';
import { ActivitiesPage } from './pages/activities/activities.page';
import { SpotDetailPage } from './pages/spot-detail/spot-detail.page';
import { ActivityDetailPage } from './pages/activity-detail/activity-detail.page';
import { HotelsPage } from './pages/hotels/hotels.page';
import { HotelDetailPage } from './pages/hotel-detail/hotel-detail.page';
import { RestaurantsPage } from './pages/restaurants/restaurants.page';
import { RestaurantDetailPage } from './pages/restaurant-detail/restaurant-detail.page';
import { BikePage } from './pages/bike/bike.page';
import { BikeDetailPage } from './pages/bike-detail/bike-detail.page';
import { LoginPage } from './pages/login/login.page';
import { RegisterPage } from './pages/register/register.page';
import { SearchPage } from './pages/search/search.page';
import { ProfilePage } from './pages/profile/profile.page';
import { authGuard } from './guards/auth.guard';
import { ScenesPage } from './pages/scenes/scenes.page';

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
  { path:'search', component: SearchPage },
  { path:'search/:search', component: SearchPage },
  { path:'spots', redirectTo: 'spots/Taipei/1' },
  { path:'spots/:city', redirectTo: 'spots/:city/1' },
  { path:'spots/:city/:page', component: SpotsPage },
  { path:'spot/:id', component: SpotDetailPage },
  { path:'activities', component: ActivitiesPage },
  { path:'activities/:city', component: ActivitiesPage },
  { path:'activity/:id', component: ActivityDetailPage },
  // { path:'hotels', component: HotelsPage },
  // { path:'hotels/:city', component: HotelsPage },
  // { path:'hotel/:id', component: HotelDetailPage },
  // { path:'restaurants', component: RestaurantsPage },
  // { path:'restaurants/:city', component: RestaurantsPage },
  // { path:'restaurant/:id', component: RestaurantDetailPage },
  { path:'bike', component: BikePage },
  { path:'bike/:city', component: BikePage },
  { path:'bike/:city/:name', component: BikeDetailPage },

  { path: '**', redirectTo: '', pathMatch: 'full'}
];
