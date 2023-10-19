import { initTE, Ripple } from 'tw-elements';
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { CardComponent } from 'src/app/components/card/card.component';
import { TourismService } from 'src/app/services/tourism.service';
import { map, Observable, switchMap } from 'rxjs';
import { CityName } from 'src/app/models/city-name.model';
import { CitySelectorComponent } from 'src/app/components/city-selector/city-selector.component';

@Component({
  selector: 'app-spots',
  standalone: true,
  templateUrl: './spots.page.html',
  imports: [
    CommonModule, RouterModule,
    CardComponent, CitySelectorComponent,
  ],
})
export class SpotsPage implements OnInit {
  static ROW_PER_PAGE = 15;

  #route = inject(ActivatedRoute);
  #router = inject(Router);
  #tourismService = inject(TourismService);

  spots$!:  Observable<any>;
  city!: string;
  skipSpots = 0;
  page = 1;
  stopCount = false;

  ngOnInit() {
    initTE({ Ripple });
    this.#route.paramMap.subscribe(param => {
      this.city = param.get('city') || 'Taipei';
      this.#getSpotsByCity();
    });
  }

  getSpots(cityName: string) {
    this.#router.navigate(['spots', cityName]);
  }

  prevPage() {
    this.page -= 1;
    this.#getSpotsByCity();
  }

  nextPage() {
    this.page += 1;
    this.#getSpotsByCity();
  }

  #getSpotsByCity() {
    this.spots$ = this.#tourismService.getByCityName(
      'spot',
      this.city as CityName,
      this.page,
      SpotsPage.ROW_PER_PAGE
    ).pipe(
      map((spots) => {
        const len = (spots as []).length;
        this.stopCount = (len < SpotsPage.ROW_PER_PAGE) ? true : false;
        return spots;
      }),
    );
  }
}
