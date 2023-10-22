import { Component, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { initTE, Ripple } from 'tw-elements';
import { TourismService } from 'src/app/services/tourism.service';
import { Observable, map } from 'rxjs';
import { TourismCat } from 'src/app/models/tourism-cat.model';
import { CityName } from 'src/app/models/city-name.model';
import { CardSpotComponent } from 'src/app/components/card-spot/card-spot.component';
import { CardHotelComponent } from 'src/app/components/card-hotel/card-hotel.component';
import { CitySelectorComponent } from 'src/app/components/city-selector/city-selector.component';

@Component({
  selector: 'app-hotels',
  standalone: true,
  templateUrl: './hotels.page.html',
  imports: [
    CommonModule,
    CardHotelComponent, CitySelectorComponent
  ],
})
export class HotelsPage {
  static ROW_PER_PAGE = 15;

  #route = inject(ActivatedRoute);
  #router = inject(Router);
  #location = inject(Location);
  #tourismService = inject(TourismService);

  hotels$!:  Observable<any>;
  city!: string;
  page = 1;
  stopCount = false;

  ngOnInit() {
    initTE({ Ripple });
    this.#route.paramMap.subscribe(param => {
      this.city = param.get('city') || 'Taipei';
      this.#getHotelsByCity();
    });
    this.#route.queryParamMap.subscribe(param => {
      const p = parseInt(param.get('page')||'1');
      this.page = p;
      this.#getHotelsByCity();
    });
  }

  getHotels(cityName: string) {
    this.#router.navigate(['hotels', cityName]);
  }

  prevPage() {
    this.page -= 1;
    this.#location.replaceState(`hotels/${this.city}`, `page=${this.page}`);
    this.#getHotelsByCity();
  }

  nextPage() {
    this.page += 1;
    this.#location.replaceState(`hotels/${this.city}`, `page=${this.page}`)
    this.#getHotelsByCity();
  }

  #getHotelsByCity() {
    this.hotels$ = this.#tourismService.getByCityName(
      TourismCat.Hotel,
      this.city as CityName,
      this.page,
      HotelsPage.ROW_PER_PAGE
    ).pipe(
      map((items) => {
        const len = (items as []).length;
        this.stopCount = (len < HotelsPage.ROW_PER_PAGE) ? true : false;
        return items;
      }),
    );
  }

}
