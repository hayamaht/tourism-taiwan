import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TypeSelectorComponent } from 'src/app/components/type-selector/type-selector.component';
import { CitySelectorComponent } from 'src/app/components/city-selector/city-selector.component';
import { PaginationComponent } from 'src/app/components/pagination/pagination.component';
import { ActivatedRoute, Router } from '@angular/router';
import { TourismService } from 'src/app/services/tourism.service';
import { Observable, of } from 'rxjs';
import { Spot } from 'src/app/models/scene.model';
import { CityName, CityNameTW } from 'src/app/models/city-name.model';
import { TourismCat, TourismCategoryTW } from 'src/app/models/tourism-cat.model';
import { CardSpotComponent } from 'src/app/components/card-spot/card-spot.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-scenes',
  standalone: true,
  templateUrl: './scenes.page.html',
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule,
    TypeSelectorComponent, CitySelectorComponent,
    PaginationComponent, CardSpotComponent
  ],
})
export class ScenesPage implements OnInit {
  #route = inject(ActivatedRoute);
  #router = inject(Router);
  #tourismService = inject(TourismService);
  #fb = inject(FormBuilder);

  randomSpots$!: Observable<Spot[]>;
  spots$!: Observable<Spot[]>;

  form = this.#fb.group({
    type: [''],
    city: [''],
  });

  typesTW = Object.entries(TourismCategoryTW);
  citiesTW = Object.entries(CityNameTW);

  city!: string;
  type!: string;

  get random() {
    const r = Math.floor(Math.random() * 4);
    console.log(r)
    return r;
  }

  ngOnInit(): void {
    this.#route.queryParamMap.subscribe(params => {
      const city = params.get('city');
      const type = params.get('type');

      this.form.patchValue({
        type, city
      });

      this.randomSpots$ = (!type && !city) ? this.#tourismService.getRandom() :
        (!type) ? this.#tourismService.getRandom(undefined, city as CityName) :
        (!city) ? this.#tourismService.getRandom(type as TourismCat) :
        of([]);
      this.spots$ = (type && city)
        ? this.#tourismService.getSpots(type as TourismCat, city as CityName)
        : of([]);

      if(!type || !city) return;

      this.type = type;
      this.city = city;

    });
  }

  onTypeChange(event: any) {;
    this.#router.navigate([], {
      queryParams: {
        type: event.currentTarget.value
      },
      queryParamsHandling: 'merge'
    });
  }

  onCityChange(event: any) {
    this.#router.navigate([], {
      queryParams: {
        city: event.currentTarget.value
      },
      queryParamsHandling: 'merge'
    });
  }

}
