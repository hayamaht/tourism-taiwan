import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TourismService } from 'src/app/services/tourism.service';
import { Observable } from 'rxjs';
import {
  Collapse,
  Ripple,
  initTE,
} from "tw-elements";

import { CityName } from 'src/app/models/city-name.model';
import { CardActivityComponent } from 'src/app/components/card-activity/card-activity.component';
import { CitySelectorComponent } from 'src/app/components/city-selector/city-selector.component';
import { CardFeatureComponent } from 'src/app/components/card-feature/card-feature.component';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.page.html',
  imports: [
    CommonModule,
    CardActivityComponent, CitySelectorComponent,
    CardFeatureComponent,
  ],
})
export class HomePage implements OnInit {
  #router = inject(Router);
  #tourismService = inject(TourismService);

  thisActivities$!: Observable<any>;
  nextActivities$!: Observable<any>;
  month = new Date().getMonth() + 2;

  ngOnInit(): void {
    initTE({ Collapse, Ripple });
    this.thisActivities$ = this.#getActivities('this');
    this.nextActivities$ = this.#getActivities('next');
  }

  onCityChange(cityName: string) {
    console.log(cityName);
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
    this.#router.navigateByUrl('/spots')
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
