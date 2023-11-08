import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TourismService } from 'src/app/services/tourism.service';
import { Observable, single } from 'rxjs';
import { CityName } from 'src/app/models/city-name.model';
import { CardActivityComponent } from 'src/app/components/card-activity/card-activity.component';
import { CitySelectorComponent } from 'src/app/components/city-selector/city-selector.component';
import { CardFeatureComponent } from 'src/app/components/card-feature/card-feature.component';
import { NewsService } from 'src/app/services/news.service';
import { News } from 'src/app/models/news.model';
import { ItemNewsComponent } from 'src/app/components/item-news/item-news.component';


@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.page.html',
  imports: [
    CommonModule,
    CardActivityComponent, CitySelectorComponent,
    CardFeatureComponent, ItemNewsComponent,
  ],
})
export class HomePage implements OnInit {
  #router = inject(Router);
  #tourismService = inject(TourismService);
  #newsService = inject(NewsService);

  thisActivities$!: Observable<any>;
  nextActivities$!: Observable<any>;
  news$!: Observable<News[]>;
  month = new Date().getMonth() + 2;

  ngOnInit(): void {
    this.thisActivities$ = this.#getActivities('this');
    this.nextActivities$ = this.#getActivities('next');
    this.news$ = this.#newsService.get();
  }

  onCityChange(cityName: string) {
    this.thisActivities$ = this.#getActivities(
      'this',
      cityName as CityName
    );
  }
  onCityChangeNext(cityName: string) {
    this.nextActivities$ = this.#getActivities(
      'next',
      cityName as CityName
    );
  }

  getStarted() {
    this.#router.navigateByUrl('/spots');
  }

  #getActivities(month: 'this'|'next', cityName = CityName.Taipei) {
    return this.#tourismService.getActivitesByMonth(
      cityName as CityName,
      month,
      1,
      30
    );
  }
}
