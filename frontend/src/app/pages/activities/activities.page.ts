import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { initTE, Ripple } from 'tw-elements';
import { TourismService } from 'src/app/services/tourism.service';
import { CityName } from 'src/app/models/city-name.model';
import { Observable, map } from 'rxjs';
import { CardComponent } from 'src/app/components/card/card.component';
import { CitySelectorComponent } from 'src/app/components/city-selector/city-selector.component';
import { CardActivityComponent } from 'src/app/components/card-activity/card-activity.component';

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
  #tourismService = inject(TourismService);

  activities$!: Observable<any>;
  city!: string;
  page = 1;
  stopCount = false;

  ngOnInit(): void {
    initTE({ Ripple });
    this.#route.paramMap.subscribe(param => {
      this.city = param.get('city') || 'Taipei';
      this.#getActivitiesByCity();
    });
  }

  getActivities(cityName: string) {
    this.#router.navigate(['activities', cityName]);
  }

  prevPage() {
    this.page -= 1;
    this.#getActivitiesByCity();
  }

  nextPage() {
    this.page += 1;
    this.#getActivitiesByCity();
  }

  #getActivitiesByCity() {
    this.activities$ = this.#tourismService.getByCityName(
      'activity',
      this.city as CityName,
      this.page,
      ActivitiesPage.ROW_PER_PAGE,
      'StartTime desc'
    ).pipe(
      map((items) => {
        const len = (items as []).length;
        this.stopCount = (len < ActivitiesPage.ROW_PER_PAGE) ? true : false;
        return items;
      }),
    );
  }
}
