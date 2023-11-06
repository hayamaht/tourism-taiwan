
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { initTE, Ripple } from 'tw-elements';
import { TourismService } from 'src/app/services/tourism.service';
import { BehaviorSubject, forkJoin, map, merge, mergeAll, Observable, switchMap, tap } from 'rxjs';
import { CityName, CityNameTW } from 'src/app/models/city-name.model';
import { CitySelectorComponent } from 'src/app/components/city-selector/city-selector.component';
import { CardSpotComponent } from 'src/app/components/card-spot/card-spot.component';
import { TourismCat } from 'src/app/models/tourism-cat.model';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';
import { Favorite } from 'src/app/models/favorite.model';


@Component({
  selector: 'app-spots',
  standalone: true,
  templateUrl: './spots.page.html',
  imports: [
    CommonModule, RouterModule,
    CardSpotComponent, CitySelectorComponent,
  ],
})
export class SpotsPage implements OnInit {
  static ROW_PER_PAGE = 20;

  #route = inject(ActivatedRoute);
  #router = inject(Router);
  #location = inject(Location);
  #tourismService = inject(TourismService);
  #authService = inject(AuthService);
  #userService = inject(UserService);

  spots$!:  Observable<any>;
  favs!: Favorite[];
  user!: User;
  city!: string;
  page = 1;
  count = 0;
  totalPages = 0;

  ngOnInit() {
    this.user = this.#authService.currentUser;
    this.#route.paramMap.subscribe(param => {
      this.city = param.get('city') || 'Taipei';
      this.#tourismService
        .getCountByType(TourismCat.ScenicSpot, this.city as CityName)
        .subscribe(len => {
          this.count = len;
          this.totalPages = Math.ceil(this.count / SpotsPage.ROW_PER_PAGE);
        });
      this.#getSpotsByCity();
    });
    this.#route.queryParamMap.subscribe(param => {
      const p = parseInt(param.get('page')||'1');
      this.page = p;
      this.#getSpotsByCity();
    });
  }

  getSpots(cityName: string) {
    this.#router.navigate(['spots', cityName]);
  }

  gotoPage(n: number) {
    this.page = n;
    this.#location.replaceState(`spots/${this.city}`, `page=${this.page}`);
    this.#getSpotsByCity();
  }

  prevPage() {
    this.page -= 1;
    this.#location.replaceState(`spots/${this.city}`, `page=${this.page}`);
    this.#getSpotsByCity();
  }

  nextPage() {
    this.page += 1;
    this.#location.replaceState(`spots/${this.city}`, `page=${this.page}`)
    this.#getSpotsByCity();
  }


  #goTop() {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  #getSpotsByCity() {
    this.spots$ = forkJoin([
      this.#userService.getByOwnerFavorites(this.user.email),
      this.#tourismService.getByCityName(
        TourismCat.ScenicSpot,
        this.city as CityName,
        this.page,
        SpotsPage.ROW_PER_PAGE
      )
    ]).pipe(
      tap(_ => this.#goTop()),
      map(([v1, v2]) => {
        const fv = v1 as Favorite[];
        const ss = v2 as [];
        for(let i in ss) {
          const spot = ss[i] as any;
          const id = spot.ScenicSpotID;
          for(let j in fv) {
            if (fv[j].tourismId === id) {
              spot.favorite = true;
            }
          }
        }
        return v2;
      })
    );
  }
}
