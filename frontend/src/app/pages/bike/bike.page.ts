import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { BikeService } from 'src/app/services/bike.service';
import { Observable, map, tap } from 'rxjs';
import { CityName } from 'src/app/models/city-name.model';
import { CitySelectorComponent } from 'src/app/components/city-selector/city-selector.component';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CardBikeRouteComponent } from 'src/app/components/card-bike-route/card-bike-route.component';

@Component({
  selector: 'app-bike',
  standalone: true,
  templateUrl: './bike.page.html',
  imports: [
    CommonModule, RouterModule,
    CitySelectorComponent, CardBikeRouteComponent
  ],
})
export class BikePage implements OnInit {
  static ROW_PER_PAGE = 30;

  #route = inject(ActivatedRoute);
  #router = inject(Router);
  #location = inject(Location)
  #bikeService = inject(BikeService);

  bikes$!: Observable<any>;
  city!: string;
  page = 1;
  stopCount = false;

  ngOnInit(): void {
    this.#route.paramMap.subscribe(param => {
      this.city = param.get('city') || 'Taipei';
      const name = param.get('name');
      if (!name) {
        this.#getRouteName();
      } else{
        this.#router.navigate(['bike', this.city, name]);
      }
    });
    this.#route.queryParamMap.subscribe(param => {
      const p = parseInt(param.get('page')||'1');
      this.page = p;
      this.#getRouteName();
    });
  }

  getBikes(cityName: string) {
    this.#router.navigate(['bike', cityName]);
  }

  prevPage() {
    this.page -= 1;
    this.#location.replaceState(`bike/${this.city}`, `page=${this.page}`);
    this.#getRouteName();
  }

  nextPage() {
    this.page += 1;
    this.#location.replaceState(`bike/${this.city}`, `page=${this.page}`)
    this.#getRouteName();
  }


  #getRouteName() {
    this.bikes$ = this.#bikeService
      .getRouteByCity(
        this.city as CityName,
        'json',
        this.page,
        BikePage.ROW_PER_PAGE
      )
      .pipe(
        tap(_ => {
          window.scrollTo({
            top: 0,
            left: 0,
            behavior:'smooth'
          })
        }),
        map((items) => {
          const len = (items as []).length;
          this.stopCount = (len < BikePage.ROW_PER_PAGE) ? true : false;
          return items;
        }),
      );
  }
}
