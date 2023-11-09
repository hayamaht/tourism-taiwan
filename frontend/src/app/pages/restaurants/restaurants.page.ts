import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CitySelectorComponent } from 'src/app/components/city-selector/city-selector.component';
import { CardRestaurantComponent } from 'src/app/components/card-restaurant/card-restaurant.component';
import { TourismService } from 'src/app/services/tourism.service';
import { Observable, map, tap } from 'rxjs';
import { TourismCat } from 'src/app/models/tourism-cat.model';
import { CityName } from 'src/app/models/city-name.model';

@Component({
  selector: 'app-restaurants',
  standalone: true,
  templateUrl: './restaurants.page.html',
  imports: [
    CommonModule, RouterModule,
    CitySelectorComponent, CardRestaurantComponent,
  ],
})
export class RestaurantsPage implements OnInit {
  static ROW_PER_PAGE = 15;

  #route = inject(ActivatedRoute);
  #router = inject(Router);
  #location = inject(Location);
  #tourismService = inject(TourismService);

  restaurants$!:  Observable<any>;
  city!: string;
  page = 1;
  stopCount = false;

  ngOnInit() {
    this.#route.paramMap.subscribe(param => {
      this.city = param.get('city') || 'NewTaipei';
      this.#getRestaurantsByCity();
    });
    this.#route.queryParamMap.subscribe(param => {
      const p = parseInt(param.get('page')||'1');
      this.page = p;
      this.#getRestaurantsByCity();
    });
  }

  getRestaurants(cityName: string) {
    // this.#router.navigate(['restaurants', cityName]);
  }

  prevPage() {
    this.page -= 1;
    this.#location.replaceState(`restaurants/${this.city}`, `page=${this.page}`);
    this.#getRestaurantsByCity();
  }

  nextPage() {
    this.page += 1;
    this.#location.replaceState(`restaurants/${this.city}`, `page=${this.page}`)
    this.#getRestaurantsByCity();
  }

  #goTop() {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  #getRestaurantsByCity() {
    this.restaurants$ = this.#tourismService.getByCityName(
      TourismCat.Restaurant,
      this.city as CityName,
      this.page,
      RestaurantsPage.ROW_PER_PAGE
    ).pipe(
      tap(_ => this.#goTop()),
      map((items) => {
        //const len = (items as []).length;
        //this.stopCount = (len < RestaurantsPage.ROW_PER_PAGE) ? true : false;
        return items;
      }),
    );
  }
}
