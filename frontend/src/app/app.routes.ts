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

export const routes: Routes = [
  { path:'', component: HomePage },
  { path:'spots', component: SpotsPage },
  { path:'spots/:city', component: SpotsPage },
  { path:'spot/:id', component: SpotDetailPage },
  { path:'activities', component: ActivitiesPage },
  { path:'activities/:city', component: ActivitiesPage },
  { path:'activity/:id', component: ActivityDetailPage },
  { path:'hotels', component: HotelsPage },
  { path:'hotels/:city', component: HotelsPage },
  { path:'hotel/:id', component: HotelDetailPage },
  { path:'restaurants', component: RestaurantsPage },
  { path:'restaurants/:city', component: RestaurantsPage },
  { path:'restaurant/:id', component: RestaurantDetailPage },
  { path:'bike', component: BikePage },
  { path:'bike/:city', component: BikePage },
  { path:'bike/:city/:name', component: BikeDetailPage },
  // { path: '**', redirectTo: '', }
];
