import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { CardComponent } from 'src/app/components/card/card.component';
import { TourismService } from 'src/app/services/tourism.service';
import { Observable } from 'rxjs';
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
  #route = inject(ActivatedRoute);
  #router = inject(Router);
  #tourismService = inject(TourismService);

  spots$!:  Observable<any>;

  ngOnInit() {
    this.#route.paramMap.subscribe(param => {
      const city = param.get('city') || 'Taipei';

      this.spots$ = this.#tourismService
        .getByCityName('spot', city as CityName);
    });
  }

  getSpots(cityName: string) {
    this.#router.navigate(['spots', cityName]);
  }
}
