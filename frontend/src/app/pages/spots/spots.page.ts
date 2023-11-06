import { Favorite } from './../../../../../backend/src/models/favorite.model';
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { initTE, Ripple } from 'tw-elements';
import { TourismService } from 'src/app/services/tourism.service';
import { BehaviorSubject, forkJoin, map, merge, mergeAll, Observable, switchMap, tap } from 'rxjs';
import { CityName } from 'src/app/models/city-name.model';
import { CitySelectorComponent } from 'src/app/components/city-selector/city-selector.component';
import { CardSpotComponent } from 'src/app/components/card-spot/card-spot.component';
import { TourismCat } from 'src/app/models/tourism-cat.model';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';
import { combineLatest, combineLatestInit } from 'rxjs/internal/observable/combineLatest';
import { Spot } from 'src/app/models/spot.model';

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
  static ROW_PER_PAGE = 15;

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
  stopCount = false;

  ngOnInit() {
    initTE({ Ripple });
    this.user = this.#authService.currentUser;

    // this.#userService
    //   .getByOwnerFavorites(this.user.email)
    //   .subscribe(favs => {
    //     this.favs = favs as Favorite[];
    //     console.log(this.favs);
    //   });

    this.#route.paramMap.subscribe(param => {
      this.city = param.get('city') || 'Taipei';
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
        const len = (v2 as []).length;
        this.stopCount = (len < SpotsPage.ROW_PER_PAGE) ? true : false;
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
