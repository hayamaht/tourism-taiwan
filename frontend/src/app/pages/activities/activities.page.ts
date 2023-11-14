import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TourismService } from 'src/app/services/tourism.service';
import { CityName, CityNameTW } from 'src/app/models/city-name.model';
import { Observable, map, tap } from 'rxjs';
import { CitySelectorComponent } from 'src/app/components/city-selector/city-selector.component';
import { CardActivityComponent } from 'src/app/components/card-activity/card-activity.component';
import { TourismCat } from 'src/app/models/tourism-cat.model';
import { Activity, Spot } from 'src/app/models/scene.model';
import { PaginationComponent } from 'src/app/components/pagination/pagination.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-activities',
  standalone: true,
  templateUrl: './activities.page.html',
  imports: [
    CommonModule, RouterModule, FormsModule,
    CardActivityComponent, CitySelectorComponent,
    PaginationComponent,
  ],
})
export class ActivitiesPage implements OnInit {
  static ROW_PER_PAGE = 15;

  #route = inject(ActivatedRoute);
  #router = inject(Router);
  #location = inject(Location);
  #tourismService = inject(TourismService);

  citiesTW = Object.entries(CityNameTW);

  thisMonth$!: Observable<Activity[]>;
  activities$!: Observable<Activity[]>;
  outPeriod$!: Observable<Activity[]>;
  city!: string;
  selectedCity!: string;

  ngOnInit(): void {

    this.#route.paramMap.subscribe(param => {
      let city = this.#checkCity(param.get('city'));
      if (!city) {
        city = CityName.Taipei.toString();
        this.#router.navigate(['activities']);
        //return
      }
      this.city = city;
      this.selectedCity = this.city;
      this.#getActivitiesByCity();
    });
    // this.#route.queryParamMap.subscribe(param => {
    //   const p = parseInt(param.get('p')||'1');
    //   console.log(p);
    //   this.page = p;
    //   this.#getActivitiesByCity();
    // });
  }

  onCityChange(event: any) {
    this.selectedCity = event.target.value;
    this.#router.navigate(['activities', this.selectedCity])
  }

  #goTop() {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  #checkCity(city: string|null) {
    if (!city) return null;
    const cs = Object.keys(CityName);
    const fs = cs.filter(v => v === city).at(0);
    return fs ? fs : null;
  }

  #getActivitiesByCity() {
    this.activities$ = this.#tourismService.getActivitiesInPeriod(
      this.city as CityName
    ).pipe(
      tap(_ => this.#goTop()),
    );

    this.thisMonth$ = this.#tourismService.getActivitesByMonth(
      this.city as CityName,
      'this'
    );

    this.outPeriod$ = this.#tourismService.getActivitiesNotInPeriod(
      this.city as CityName
    );

  }
}
