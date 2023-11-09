import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TypeSelectorComponent } from 'src/app/components/type-selector/type-selector.component';
import { CitySelectorComponent } from 'src/app/components/city-selector/city-selector.component';
import { PaginationComponent } from 'src/app/components/pagination/pagination.component';
import { ActivatedRoute, Router } from '@angular/router';
import { TourismService } from 'src/app/services/tourism.service';
import { Observable, of } from 'rxjs';
import { Spot } from 'src/app/models/scene.model';
import { CityName } from 'src/app/models/city-name.model';
import { TourismCat } from 'src/app/models/tourism-cat.model';
import { CardSpotComponent } from 'src/app/components/card-spot/card-spot.component';

@Component({
  selector: 'app-scenes',
  standalone: true,
  templateUrl: './scenes.page.html',
  imports: [
    CommonModule,
    TypeSelectorComponent, CitySelectorComponent,
    PaginationComponent, CardSpotComponent
  ],
})
export class ScenesPage implements OnInit {
  #route = inject(ActivatedRoute);
  #router = inject(Router);
  #tourismService = inject(TourismService);

  randomSpots$!: Observable<Spot[]>;
  spots$!: Observable<Spot[]>;

  ngOnInit(): void {
    this.#route.queryParamMap.subscribe(params => {
      const city = params.get('city');
      const type = params.get('type');

      this.randomSpots$ = (!type && !city) ? this.#tourismService.getRandom() :
        (!type) ? this.#tourismService.getRandom(undefined, city as CityName) :
        (!city) ? this.#tourismService.getRandom(type as TourismCat) :
        of();

      if(!type || !city) return;

      this.spots$ = this.#tourismService.getSpots(
        type as TourismCat, city as CityName
      );
    });
  }

  onTypeChange(event: string) {
    this.#router.navigate([], {
      queryParams: {
        type: event
      },
      queryParamsHandling: 'merge'
    });
  }

  onCityChange(event: string) {
    this.#router.navigate([], {
      queryParams: {
        city: event
      },
      queryParamsHandling: 'merge'
    });
  }


}
