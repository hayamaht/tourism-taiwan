import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TourismService } from 'src/app/services/tourism.service';
import { CityName } from 'src/app/models/city-name.model';
import { Observable, map, tap } from 'rxjs';
import { CitySelectorComponent } from 'src/app/components/city-selector/city-selector.component';
import { CardActivityComponent } from 'src/app/components/card-activity/card-activity.component';
import { TourismCat } from 'src/app/models/tourism-cat.model';

@Component({
  selector: 'app-activities',
  standalone: true,
  templateUrl: './activities.page.html',
  imports: [
    CommonModule, RouterModule,
    CardActivityComponent, CitySelectorComponent
  ],
})
export class ActivitiesPage implements OnInit {
  static ROW_PER_PAGE = 15;

  #route = inject(ActivatedRoute);
  #router = inject(Router);
  #location = inject(Location);
  #tourismService = inject(TourismService);

  activities$!: Observable<any>;
  city!: string;
  page = 1;
  stopCount = false;

  ngOnInit(): void {
    this.#route.paramMap.subscribe(param => {
      this.city = param.get('city') || 'Taipei';
      this.#getActivitiesByCity();
    });
    this.#route.queryParamMap.subscribe(param => {
      const p = parseInt(param.get('page')||'1');
      console.log(p);
      this.page = p;
      this.#getActivitiesByCity();
    });
  }

  getActivities(cityName: string) {
    this.#router.navigate(['activities', cityName]);
  }

  prevPage() {
    this.page -= 1;
    this.#location.replaceState(
      `activities/${this.city}`,
      `page=${this.page}`
    );
    this.#getActivitiesByCity();
  }

  nextPage() {
    this.page += 1;
    this.#location.replaceState(
      `activities/${this.city}`,
      `page=${this.page}`
    );
    this.#getActivitiesByCity();
  }

  #goTop() {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  #getActivitiesByCity() {
    this.activities$ = this.#tourismService.getByCityName(
      TourismCat.Activity,
      this.city as CityName,
      this.page,
      ActivitiesPage.ROW_PER_PAGE,
      'StartTime desc'
    ).pipe(
      tap(_ => this.#goTop()),
      map((items) => {
        const len = (items as []).length;
        this.stopCount = (len < ActivitiesPage.ROW_PER_PAGE) ? true : false;
        return items;
      }),
    );
  }
}
